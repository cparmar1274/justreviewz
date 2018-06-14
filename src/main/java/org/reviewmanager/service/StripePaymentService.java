package org.reviewmanager.service;

import java.util.HashMap;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.Card;
import com.stripe.model.Customer;
import com.stripe.model.ExternalAccountCollection;
import com.stripe.model.Invoice;
import com.stripe.model.InvoiceCollection;
import com.stripe.model.Subscription;

@Service
public class StripePaymentService {

	@Autowired(required = true)
	public ElasticService elasticService;

	public Customer billingInformation(String token) {
		Customer customer = null;
		try {
			Stripe.apiKey = RMUtil.STRIPE_API_KEY;
			customer = Customer.retrieve(RMUtil.getSessionedUser().getClientId());
			Map<String, Object> updateParams = new HashMap<String, Object>();
			updateParams.put("source", token);
			customer.update(updateParams);
		} catch (Exception  e) {
			this.logError("StripePaymentService", "billingInformation", e.getMessage());
		}
		return customer;
	}
	
	public Subscription createSubscription() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Subscription subscription = null;
		try {
			Map<String, Object> item = new HashMap<>();
			item.put("plan", "review_analytics_monthly");
			Map<String, Object> items = new HashMap<>();
			items.put("0", item);
			Map<String, Object> params = new HashMap<>();
			params.put("customer", RMUtil.getSessionedUser().getClientId());
			params.put("trial_period_days", "15");
			params.put("items", items);
			subscription = Subscription.create(params);
		} catch (Exception e) {
			this.logError("StripePaymentService", "cancelSubscription", e.getMessage());
		}
		return subscription;
	}

	public Subscription cancelSubscription() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Subscription subscription = null;
		try {
			Customer customer = Customer.retrieve(RMUtil.getSessionedUser().getClientId());
			Map<String, Object> params = new HashMap<>();
			params.put("at_period_end", true);
			subscription = customer.cancelSubscription(params);
		} catch (Exception  e) {
			this.logError("StripePaymentService", "cancelSubscription", e.getMessage());
		}
		return subscription;
	}

	public Subscription startSubscription() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Subscription subscriptions = null;
		try {
			
			Customer customer = Customer.retrieve(RMUtil.getSessionedUser().getClientId());
			
			for(Subscription subscription : customer.getSubscriptions().getData())
			{
				Map<String, Object> params = new HashMap<>();
				params.put("cancel_at_period_end", false);
				subscriptions = subscription.update(params);
			}
			
		} catch (Exception  e) {
			this.logError("StripePaymentService", "startSubscription", e.getMessage());
		}
		return subscriptions;
	}

	public Customer createStripeUser(String clientEmail) {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Customer customer = null;
		try {
			Map<String, Object> params = new HashMap<>();
			params.put("email", clientEmail);
			customer = Customer.create(params);
		} catch (Exception  e) {
			this.logError("StripePaymentService", "createStripeUser", e.getMessage());
		}
		return customer;
	}
	
	
	public void logError(String className, String methodName, String errorDetail) {
		try {
			elasticService.addObject(RMUtil.ERROR_INDEX, RMUtil.ERROR_TYPE,
					RMUtil.getApplicationError(className, methodName, errorDetail));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public Map<String,Object> getInvoiceDetail() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Map<String,Object> data = new HashMap<String,Object>();
		InvoiceCollection invoiceList = null;
		Map<String, Object> invoiceParams = new HashMap<String, Object>();
		invoiceParams.put("customer", RMUtil.getSessionedUser().getClientId());
		invoiceParams.put("limit", "10");
		try {
			invoiceList =  Invoice.list(invoiceParams);
			for(Invoice invoice : invoiceList.getData()){
				data.put(invoice.getId(),invoice);
			}
		} catch (Exception e) {
			this.logError("StripePaymentService", "getInvoiceDetail", e.getMessage());
		}
		return data;
	}

	public Map<String,Object>  getBillingDetail() {
		Map<String,Object> data = new HashMap<String,Object>();
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		ExternalAccountCollection sourceData = null;
		try {
			Customer customer = Customer.retrieve(RMUtil.getSessionedUser().getClientId());
			sourceData = customer.getSources();
			if(!sourceData.getData().isEmpty()){
				Card card = (Card) sourceData.getData().get(0);
				data.put("last4", card.getLast4());
				data.put("expiryDate",card.getExpMonth()+"/"+card.getExpYear());
				data.put("brand", card.getBrand());
				data.put("country", card.getCountry());
			}
		} catch (Exception e) {
			this.logError("StripePaymentService", "getBillingDetail", e.getMessage());
		}
		
		return data;
	}
}
