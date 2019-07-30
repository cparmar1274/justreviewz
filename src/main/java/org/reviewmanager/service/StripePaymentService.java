package org.reviewmanager.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.reviewmanager.interfaces.ReviewServiceInterface;
import org.reviewmanager.users.BusinessUser;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
	@Qualifier(value = "mongo")
	ReviewServiceInterface userService;

	/**
	 * Billing information.
	 *
	 * @param token
	 *            the token
	 * @return the customer
	 */
	public Customer billingInformation(String token) {
		Customer customer = null;
		try {
			Stripe.apiKey = RMUtil.STRIPE_API_KEY;
			customer = this.getCustomer();
			Map<String, Object> updateParams = new HashMap<String, Object>();
			updateParams.put("source", token);
			customer.update(updateParams);
		} catch (Exception e) {
			this.logError("StripePaymentService", "billingInformation", e.getMessage());
		}
		return customer;
	}

	/**
	 * Creates the subscription.
	 *
	 * @return the subscription
	 */
	public Subscription createSubscription() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Subscription subscription = null;
		try {
			Map<String, Object> item = new HashMap<>();
			item.put("plan", RMUtil.STRIPE_PLAN_ID);
			Map<String, Object> items = new HashMap<>();
			items.put("0", item);
			Map<String, Object> params = new HashMap<>();
			params.put("customer", this.getCustomer().getId());
			params.put("trial_period_days", "15");
			params.put("items", items);
			subscription = Subscription.create(params);
		} catch (Exception e) {
			this.logError("StripePaymentService", "createSubscription", e.getMessage());
		}
		return subscription;
	}

	/**
	 * Cancel subscription.
	 *
	 * @return the subscription
	 */
	public Subscription cancelSubscription() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Subscription subscription = null;
		try {
			Customer customer = this.getCustomer();
			Map<String, Object> params = new HashMap<>();
			params.put("at_period_end", true);
			subscription = customer.cancelSubscription(params);
		} catch (Exception e) {
			this.logError("StripePaymentService", "cancelSubscription", e.getMessage());
		}
		return subscription;
	}

	/**
	 * Start subscription.
	 *
	 * @return the subscription
	 */
	public Subscription startSubscription() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Subscription subscriptions = null;
		try {

			Customer customer = this.getCustomer();

			for (Subscription subscription : customer.getSubscriptions().getData()) {
				Map<String, Object> params = new HashMap<>();
				params.put("cancel_at_period_end", false);
				subscriptions = subscription.update(params);
			}

		} catch (Exception e) {
			this.logError("StripePaymentService", "startSubscription", e.getMessage());
		}
		return subscriptions;
	}

	/**
	 * Creates the stripe user.
	 *
	 * @param client
	 *            the client
	 * @return the customer
	 */
	public Customer createStripeUser(BusinessUser client) {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Customer customer = null;
		try {
			Map<String, Object> params = new HashMap<>();
			params.put("email", client.getClientEmail());
			customer = this.getCustomer();
		} catch (Exception e) {
			this.logError("StripePaymentService", "createStripeUser", e.getMessage());
		}
		return customer;
	}

	/**
	 * Log error.
	 *
	 * @param className
	 *            the class name
	 * @param methodName
	 *            the method name
	 * @param errorDetail
	 *            the error detail
	 */
	public void logError(String className, String methodName, String errorDetail) {
		try {
			// elasticService.addObject(RMUtil.ERROR_INDEX, RMUtil.ERROR_TYPE,
			// RMUtil.getApplicationError(className, methodName, errorDetail));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * Gets the invoice detail.
	 *
	 * @return the invoice detail
	 */
	public Map<String, Object> getInvoiceDetail() {
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		Map<String, Object> data = new HashMap<String, Object>();
		InvoiceCollection invoiceList = null;
		Map<String, Object> invoiceParams = new HashMap<String, Object>();
		invoiceParams.put("customer", RMUtil.getSessionedUser().getClientId());
		invoiceParams.put("limit", "10");
		try {
			invoiceList = Invoice.list(invoiceParams);
			for (Invoice invoice : invoiceList.getData()) {
				if (invoice.getTotal() > 0)
					data.put(invoice.getId(), invoice);
			}
		} catch (Exception e) {
			this.logError("StripePaymentService", "getInvoiceDetail", e.getMessage());
		}
		return data;
	}

	/**
	 * Gets the billing detail.
	 *
	 * @return the billing detail
	 */
	public Map<String, Object> getBillingDetail() {
		Map<String, Object> data = new HashMap<String, Object>();
		Stripe.apiKey = RMUtil.STRIPE_API_KEY;
		ExternalAccountCollection sourceData = null;
		try {
			Customer customer = this.getCustomer();
			sourceData = customer.getSources();
			if (!sourceData.getData().isEmpty()) {
				Card card = (Card) sourceData.getData().get(0);
				data.put("last4", card.getLast4());
				data.put("expiryDate", card.getExpMonth() + "/" + card.getExpYear());
				data.put("brand", card.getBrand());
				data.put("country", card.getCountry());
			}
		} catch (Exception e) {
			this.logError("StripePaymentService", "getBillingDetail", e.getMessage());
		}

		return data;
	}

	public Customer getCustomer() throws Exception {
		Customer customer = null;
		Map<String, Object> params = new HashMap<>();
		BusinessUser client = (BusinessUser) userService.getUser("username", RMUtil.getSessionedUser().getUsername())
				.get("result");
		params.put("email", client.getClientEmail());
		List<Customer> customers = Customer.list(params).getData();
		for (Customer cust : customers) {
			customer = cust;
		}

		if (customer == null) {
			params.put("shipping[name]", client.getClientName());
			params.put("shipping[address][line1]", client.getAddress().getStreetName());
			params.put("shipping[address][city]", client.getAddress().getCity());
			params.put("shipping[address][state]", client.getAddress().getProvince());
			params.put("shipping[address][postal_code]", client.getAddress().getPostalCode());
			params.put("shipping[address][country]", client.getAddress().getCountry());
			params.put("shipping[phone]", client.getClientBusinessPhoneNumber());
			params.put("email", client.getClientEmail());
			params.put("description", client.getClientName());
			customer = Customer.create(params);
		}
		return customer;

	}

	public boolean getSubscriptionStatus() {
		Customer customer;
		try {
			customer = this.getCustomer();
			return !customer.getSubscriptions().getData().isEmpty();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
}
