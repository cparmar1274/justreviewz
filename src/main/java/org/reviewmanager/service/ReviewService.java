package org.reviewmanager.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.elasticsearch.search.sort.SortOrder;
import org.reviewmanager.interfaces.ReviewServiceInterface;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.EmailNotificationObject;
import org.reviewmanager.pojo.Notification;
import org.reviewmanager.pojo.ProductObject;
import org.reviewmanager.pojo.PromotionCounterObject;
import org.reviewmanager.pojo.PromotionObject;
import org.reviewmanager.pojo.QueryObject;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.SearchBusinessObject;
import org.reviewmanager.users.BusinessUser;
import org.reviewmanager.users.BusinessUserTemp;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.stripe.model.Customer;
import com.stripe.model.Subscription;

// TODO: Auto-generated Javadoc
/**
 * The Class ReviewService.
 */
@Service
public class ReviewService {

	/** The report incident service. */
	@Autowired
	@Qualifier(value = "mongo")
	public ReviewServiceInterface reportIncidentService;

	/** The stripe payment service. */
	@Autowired
	public StripePaymentService stripePaymentService;

	/** The notification service. */
	@Autowired
	public ReviewNotificationService notificationService;

	/**
	 * Adds the review.
	 *
	 * @param reviewObject
	 *            the review object
	 * @return the map
	 */
	public Map<String, Object> addReview(String reviewObject) {
		return this.addReview(RMUtil.convertToReview(reviewObject));
	}

	/**
	 * Adds the review.
	 *
	 * @param reviewObject
	 *            the review object
	 * @return the map
	 */
	@CacheEvict(value = "justreviewz_review", allEntries = true)
	public Map<String, Object> addReview(ReviewObject reviewObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		if (reviewObject == null)
			return null;

		data.putAll(reportIncidentService.addReview(reviewObject));

		// add clientId -> emailId
		reportIncidentService.addClientCustomer(reviewObject.getClientId(), reviewObject.getPostedEmail(),
				reviewObject.getPostedBy());

		return data;
	}

	/**
	 * Gets the reviews.
	 *
	 * @param username
	 *            the username
	 * @param startIndex
	 *            the start index
	 * @param pageSize
	 *            the page size
	 * @param searchText
	 *            the search text
	 * @param sortType
	 *            the sort type
	 * @return the reviews
	 */
	//@Cacheable("justreviewz_review")
	public Map<String, Object> getReviews(String username, Integer startIndex, Integer pageSize, String searchText,
			String sortType) {
		Map<String, Object> mapData = new HashMap<String, Object>();
		List<ReviewObject> data = new ArrayList<ReviewObject>();

		// sort
		String fieldName = sortType.split(":")[0].trim();
		String fieldDir = sortType.split(":")[1].trim();
		data = (List<ReviewObject>) reportIncidentService
				.getReview(searchText, username,
						fieldName.equalsIgnoreCase("ReviewDate") ? "reviewDate" : "reviewRating",
						(fieldDir.toLowerCase().equalsIgnoreCase("latest")
								|| fieldDir.toLowerCase().equalsIgnoreCase("highest")) ? SortOrder.DESC : SortOrder.ASC)
				.get("result");
		String pageSizes = RMUtil.getSearchPageSizes(Integer.valueOf(data.size() / pageSize));
		mapData.put("count", data.size());
		mapData.put("maxPageSize", pageSizes.split(",").length);
		mapData.put("pageSize", pageSizes);

		data = data.subList(startIndex, (startIndex + pageSize) > data.size() ? data.size() : startIndex + pageSize);
		mapData.put("data", data);
		return mapData;
	}

	/**
	 * Gets the dashboard chart data.
	 *
	 * @param username
	 *            the username
	 * @return the dashboard chart data
	 */
	//@Cacheable("justreviewz_chartdata")
	public Map<String, Object> getDashboardChartData(String username) {
		return reportIncidentService.getDashboardObject(username);
	}

	/**
	 * Gets the trending data.
	 *
	 * @param username
	 *            the username
	 * @return the trending data
	 */
	//@Cacheable("justreviewz_treadingdata")
	public Map<String, Object> getTrendingData(String username) {
		return reportIncidentService.getTrendingData(username);
	}

	/**
	 * Gets the competitors.
	 *
	 * @param username
	 *            the username
	 * @return the competitors
	 */
	public Map<String, Object> getCompetitors(String username) {
		return reportIncidentService.getCompetitor(username);
	}

	/**
	 * Gets the performers.
	 *
	 * @param username
	 *            the username
	 * @return the performers
	 */
	public Map<String, Object> getPerformers(String username) {
		return reportIncidentService.getPerformers(username);
	}

	/**
	 * Adds the competitor.
	 *
	 * @param businessObject
	 *            the business object
	 * @return the map
	 */
	public Map<String, Object> addCompetitor(BusinessObject businessObject) {
		return reportIncidentService.addCompetitor(businessObject);
	}

	/**
	 * Adds the user.
	 *
	 * @param newUserRequest
	 *            the new user request
	 * @return the map
	 */
	public Map<String, Object> addUser(BusinessUserTemp newUserRequest) {
		return reportIncidentService.addUser(newUserRequest);
	}

	/**
	 * Gets the user.
	 *
	 * @param userNameField
	 *            the user name field
	 * @param userNameValue
	 *            the user name value
	 * @return the user
	 */
	public Map<String, Object> getUser(String userNameField, String userNameValue) {
		return reportIncidentService.getUser(userNameField, userNameValue);
	}

	/**
	 * Update user.
	 *
	 * @param clientId
	 *            the client id
	 * @param user
	 *            the user
	 * @return the map
	 */
	public Map<String, Object> updateUser(String clientId, BusinessUser user) {
		return reportIncidentService.updateUser(clientId, user);
	}

	/**
	 * Adds the action item.
	 *
	 * @param reviewId
	 *            the review id
	 * @return the map
	 */
	public Map<String, Object> addActionItem(String reviewId) {
		return reportIncidentService.addActionItem(reviewId);
	}

	/**
	 * Removes the action item.
	 *
	 * @param reviewId
	 *            the review id
	 * @return the map
	 */
	public Map<String, Object> removeActionItem(String reviewId) {
		return reportIncidentService.removeActionItem(reviewId);
	}

	/**
	 * Gets the action item.
	 *
	 * @param username
	 *            the username
	 * @return the action item
	 */
	public Map<String, Object> getActionItem(String username) {
		return reportIncidentService.getActionItem(StringUtils.EMPTY, username, "reviewDate", SortOrder.DESC);
	}

	/**
	 * Billing information.
	 *
	 * @param token
	 *            the token
	 * @return the customer
	 */
	public Customer billingInformation(String token) {
		return stripePaymentService.billingInformation(token);
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
		reportIncidentService.logError(className, methodName, errorDetail);
	}

	/**
	 * Cancel subscription.
	 *
	 * @return the subscription
	 */
	public Subscription cancelSubscription() {
		return stripePaymentService.cancelSubscription();
	}

	/**
	 * Start subscription.
	 *
	 * @return the subscription
	 */
	public Subscription startSubscription() {
		return stripePaymentService.startSubscription();
	}

	/**
	 * Creates the stripe user.
	 *
	 * @param client
	 *            the client
	 * @return the customer
	 */
	public Customer createStripeUser(BusinessUser client) {
		return stripePaymentService.createStripeUser(client);
	}

	/**
	 * Gets the invoice detail.
	 *
	 * @return the invoice detail
	 */
	public Map<String, Object> getInvoiceDetail() {
		return stripePaymentService.getInvoiceDetail();
	}

	/**
	 * Gets the billing detail.
	 *
	 * @return the billing detail
	 */
	public Map<String, Object> getBillingDetail() {
		return stripePaymentService.getBillingDetail();
	}

	/**
	 * Change password.
	 *
	 * @param newPassword
	 *            the new password
	 * @param oldPassword
	 *            the old password
	 * @return the map
	 */
	public Map<String, Object> changePassword(String newPassword, String oldPassword) {
		return reportIncidentService.changePassword(newPassword, oldPassword);
	}

	/**
	 * Reset password.
	 *
	 * @param clientEmail
	 *            the client email
	 * @return the map
	 */
	public Map<String, Object> resetPassword(String clientEmail) {
		return reportIncidentService.resetPassword(clientEmail);
	}

	/**
	 * Creates the subscription.
	 *
	 * @return the subscription
	 */
	public Subscription createSubscription() {
		return stripePaymentService.createSubscription();
	}

	/**
	 * Adds the public review.
	 *
	 * @param reviewObject
	 *            the review object
	 * @return the map
	 */
	@CacheEvict(value = "justreviewz_reply", allEntries = true)
	public Map<String, Object> addPublicReview(ReviewObject reviewObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("result", this.addReview(reviewObject));
		data.put("success", true);
		notificationService.addNotification(new Notification(reviewObject.getClientId(),
				reviewObject.getPostedBy() + " posted review", false, new Date()));
		return data;
	}

	/**
	 * Gets the public reviews.
	 *
	 * @param reviewClient
	 *            the review client
	 * @param sortingOrder
	 *            the sorting order
	 * @return the public reviews
	 */
	@Cacheable("justreviewz_reply")
	public Map<String, Object> getPublicReviews(ReviewObject reviewClient, String sortingOrder) {
		return reportIncidentService.getPublicReviews(reviewClient, sortingOrder);
	}

	/**
	 * Gets the public replies.
	 *
	 * @param publicReview
	 *            the public review
	 * @return the public replies
	 */
	@Cacheable(value = "justreviewz_reply", key = "#publicReview.hashCode()")
	public Map<String, Object> getPublicReplies(ReviewObject publicReview) {
		return reportIncidentService.getPublicReplies(publicReview);
	}

	/**
	 * Like comment.
	 *
	 * @param reviewId
	 *            the review id
	 * @param likeFlag
	 *            the like flag
	 * @return the map
	 */
	public Map<String, Object> likeComment(Integer reviewId, Integer likeFlag) {
		return reportIncidentService.likeComment(reviewId, likeFlag);
	}

	/**
	 * Dislike comment.
	 *
	 * @param reviewId
	 *            the review id
	 * @param likeFlag
	 *            the like flag
	 * @return the map
	 */
	public Map<String, Object> dislikeComment(Integer reviewId, Integer likeFlag) {
		return reportIncidentService.dislikeComment(reviewId, likeFlag);
	}

	/**
	 * Search business.
	 *
	 * @param query
	 *            the query
	 * @param type
	 *            the type
	 * @return the map
	 */
	public Map<String, Object> searchBusiness(String query, String type) {
		return reportIncidentService.searchBusiness(query, type);
	}

	/**
	 * Search location.
	 *
	 * @param query
	 *            the query
	 * @param type
	 *            the type
	 * @return the map
	 */
	public Map<String, Object> searchLocation(String query, String type) {
		return reportIncidentService.searchLocation(query, type);
	}

	/**
	 * Adds the public query.
	 *
	 * @param queryObject
	 *            the query object
	 * @return the map
	 */
	@CacheEvict(value = "justreviewz_query", allEntries = true)
	public Map<String, Object> addPublicQuery(QueryObject queryObject) {
		notificationService.addNotification(new Notification(queryObject.getClientId(),
				queryObject.getPostedBy() + " asked query.", false, new Date()));
		reportIncidentService.addClientCustomer(queryObject.getClientId(), queryObject.getPostedEmail(),
				queryObject.getPostedBy());
		return reportIncidentService.addPublicQuery(queryObject);
	}

	/**
	 * Gets the public query.
	 *
	 * @param queryObject
	 *            the query object
	 * @return the public query
	 */
	@Cacheable(value = "justreviewz_query", key = "#queryObject.hashCode()")
	public Map<String, Object> getPublicQuery(QueryObject queryObject) {
		return reportIncidentService.getPublicQuery(queryObject);
	}

	/**
	 * Gets the business customers.
	 *
	 * @param clientId
	 *            the client id
	 * @return the business customers
	 */
	@Cacheable(value = "justreviewz_customerbase")
	public Map<String, Integer> getBusinessCustomers(String clientId) {
		return reportIncidentService.getBusinessCustomers(clientId);
	}

	/**
	 * Gets the promotion.
	 *
	 * @param promotionObject
	 *            the promotion object
	 * @param filter
	 *            the filter
	 * @return the promotion
	 */
	public Map<String, Object> getPromotion(PromotionObject promotionObject, boolean filter) {
		return reportIncidentService.getPromotion(promotionObject, filter);
	}

	/**
	 * Adds the promotion.
	 *
	 * @param promotionObject
	 *            the promotion object
	 * @return the map
	 */
	public Map<String, Object> addPromotion(PromotionObject promotionObject) {
		return reportIncidentService.addPromotion(promotionObject);
	}

	/**
	 * Gets the promotion counter.
	 *
	 * @param promotionCounterObject
	 *            the promotion counter object
	 * @return the promotion counter
	 */
	public Map<String, Object> getPromotionCounter(PromotionCounterObject promotionCounterObject) {
		return reportIncidentService.getPromotionCounter(promotionCounterObject);
	}

	/**
	 * Request promotion.
	 *
	 * @param promotionCounterObject
	 *            the promotion counter object
	 * @param resetFlag
	 *            the reset flag
	 * @return the map
	 */
	public Map<String, Object> requestPromotion(PromotionCounterObject promotionCounterObject, boolean resetFlag) {
		return reportIncidentService.requestPromotion(promotionCounterObject, resetFlag);
	}

	/**
	 * Adds the client customer.
	 *
	 * @param clientId
	 *            the client id
	 * @param email
	 *            the email
	 * @return the map
	 */
	public Map<String, Object> addClientCustomer(String clientId, String email) {
		notificationService
				.addNotification(new Notification(clientId, email + " subscribed your updates.", false, new Date()));
		return reportIncidentService.addClientCustomer(clientId, email, email);
	}

	/**
	 * Removes the client customer.
	 *
	 * @param clientId
	 *            the client id
	 * @param email
	 *            the email
	 * @return the map
	 */
	public Map<String, Object> removeClientCustomer(String clientId, String email) {
		return reportIncidentService.removeClientCustomer(clientId, email, email);
	}

	/**
	 * Register new business.
	 *
	 * @param searchBusinessObject
	 *            the search business object
	 * @return the map
	 */
	public Map<String, Object> registerNewBusiness(SearchBusinessObject searchBusinessObject) {
		return reportIncidentService.registerNewBusiness(searchBusinessObject);
	}

	public ReviewObject getReviewById(String reviewId) {
		return reportIncidentService.getReviewId(reviewId);
	}

	public Map<String, Object> sendDiscount(EmailNotificationObject emailObject) {
		return reportIncidentService.sendDiscount(emailObject);
	}

	public boolean getSubscriptionStatus() {
		return stripePaymentService.getSubscriptionStatus();
	}

	public Map<String, Object> postProduct(ProductObject productObject) {
		return reportIncidentService.postProduct(productObject);
	}

	public Map<String, Object> getProduct(ProductObject productObject) {
		return reportIncidentService.getProduct(productObject);
	}

	public ProductObject getProductById(String productId) {
		return reportIncidentService.getProductById("productId", productId);
	}

}
