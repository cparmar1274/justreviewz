package org.reviewmanager.service;

import java.util.HashMap;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.Customer;
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
		Subscription subscription = null;
		try {
			Map<String, Object> item = new HashMap<>();
			item.put("plan", "review_analytics_monthly");
			Map<String, Object> items = new HashMap<>();
			items.put("0", item);
			Map<String, Object> params = new HashMap<>();
			params.put("customer", RMUtil.getSessionedUser().getClientId());
			params.put("billing_cycle_anchor", RMUtil.getBillingCycleAnchor());
			params.put("items", items);
			subscription = Subscription.create(params);
		} catch (Exception  e) {
			this.logError("StripePaymentService", "startSubscription", e.getMessage());
		}
		return subscription;
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
}
