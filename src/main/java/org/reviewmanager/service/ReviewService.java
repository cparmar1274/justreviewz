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

@Service
public class ReviewService {

	@Autowired
	@Qualifier(value = "mongo")
	public ReviewServiceInterface reportIncidentService;

	@Autowired
	public StripePaymentService stripePaymentService;

	@Autowired
	public ReviewNotificationService notificationService;

	public Map<String, Object> addReview(String reviewObject) {
		return this.addReview(RMUtil.convertToReview(reviewObject));
	}

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

	@Cacheable("justreviewz_review")
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

	@Cacheable("justreviewz_chartdata")
	public Map<String, Object> getDashboardChartData(String username) {
		return reportIncidentService.getDashboardObject(username);
	}


	@Cacheable("justreviewz_treadingdata")
	public Map<String, Object> getTrendingData(String username) {
		return reportIncidentService.getTrendingData(username);
	}

	public Map<String, Object> getCompetitors(String username) {
		return reportIncidentService.getCompetitor(username);
	}

	public Map<String, Object> getPerformers(String username) {
		return reportIncidentService.getPerformers(username);
	}

	public Map<String, Object> addCompetitor(BusinessObject businessObject) {
		return reportIncidentService.addCompetitor(businessObject);
	}

	public Map<String, Object> addUser(BusinessUserTemp newUserRequest) {
		return reportIncidentService.addUser(newUserRequest);
	}

	public Map<String, Object> getUser(String userNameField, String userNameValue) {
		return reportIncidentService.getUser(userNameField, userNameValue);
	}

	public Map<String, Object> updateUser(String clientId, BusinessUser user) {
		return reportIncidentService.updateUser(clientId, user);
	}

	public Map<String, Object> addActionItem(String reviewId) {
		return reportIncidentService.addActionItem(reviewId);
	}

	public Map<String, Object> removeActionItem(String reviewId) {
		return reportIncidentService.removeActionItem(reviewId);
	}

	public Map<String, Object> getActionItem(String username) {
		return reportIncidentService.getActionItem(StringUtils.EMPTY, username, "reviewDate", SortOrder.DESC);
	}

	public Customer billingInformation(String token) {
		return stripePaymentService.billingInformation(token);
	}

	public void logError(String className, String methodName, String errorDetail) {
		reportIncidentService.logError(className, methodName, errorDetail);
	}

	public Subscription cancelSubscription() {
		return stripePaymentService.cancelSubscription();
	}

	public Subscription startSubscription() {
		return stripePaymentService.startSubscription();
	}

	public Customer createStripeUser(BusinessUser client) {
		return stripePaymentService.createStripeUser(client);
	}

	public Map<String, Object> getInvoiceDetail() {
		return stripePaymentService.getInvoiceDetail();
	}

	public Map<String, Object> getBillingDetail() {
		return stripePaymentService.getBillingDetail();
	}

	public Map<String, Object> changePassword(String newPassword, String oldPassword) {
		return reportIncidentService.changePassword(newPassword, oldPassword);
	}

	public Map<String, Object> resetPassword(String clientEmail) {
		return reportIncidentService.resetPassword(clientEmail);
	}

	public Subscription createSubscription() {
		return stripePaymentService.createSubscription();
	}

	@CacheEvict(value = "justreviewz_reply", allEntries = true)
	public Map<String, Object> addPublicReview(ReviewObject reviewObject) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("result", this.addReview(reviewObject));
		data.put("success", true);
		notificationService.addNotification(new Notification(reviewObject.getClientId(),
				reviewObject.getPostedBy() + " posted review", false, new Date()));
		return data;
	}

	@Cacheable("justreviewz_reply")
	public Map<String, Object> getPublicReviews(ReviewObject reviewClient, String sortingOrder) {
		return reportIncidentService.getPublicReviews(reviewClient, sortingOrder);
	}

	@Cacheable(value = "justreviewz_reply", key = "#publicReview.hashCode()")
	public Map<String, Object> getPublicReplies(ReviewObject publicReview) {
		return reportIncidentService.getPublicReplies(publicReview);
	}

	public Map<String, Object> likeComment(Integer reviewId, Integer likeFlag) {
		return reportIncidentService.likeComment(reviewId, likeFlag);
	}

	public Map<String, Object> dislikeComment(Integer reviewId, Integer likeFlag) {
		return reportIncidentService.dislikeComment(reviewId, likeFlag);
	}

	public Map<String, Object> searchBusiness(String query, String type) {
		return reportIncidentService.searchBusiness(query, type);
	}

	public Map<String, Object> searchLocation(String query, String type) {
		return reportIncidentService.searchLocation(query, type);
	}

	@CacheEvict(value = "justreviewz_query", allEntries = true)
	public Map<String, Object> addPublicQuery(QueryObject queryObject) {
		notificationService.addNotification(new Notification(queryObject.getClientId(),
				queryObject.getPostedBy() + " asked query.", false, new Date()));
		reportIncidentService.addClientCustomer(queryObject.getClientId(), queryObject.getPostedEmail(),
				queryObject.getPostedBy());
		return reportIncidentService.addPublicQuery(queryObject);
	}

	@Cacheable(value = "justreviewz_query", key = "#queryObject.hashCode()")
	public Map<String, Object> getPublicQuery(QueryObject queryObject) {
		return reportIncidentService.getPublicQuery(queryObject);
	}

	@Cacheable(value = "justreviewz_customerbase")
	public Map<String, Integer> getBusinessCustomers(String clientId) {
		return reportIncidentService.getBusinessCustomers(clientId);
	}

	public Map<String, Object> getPromotion(PromotionObject promotionObject, boolean filter) {
		return reportIncidentService.getPromotion(promotionObject, filter);
	}

	public Map<String, Object> addPromotion(PromotionObject promotionObject) {
		return reportIncidentService.addPromotion(promotionObject);
	}

	public Map<String, Object> getPromotionCounter(PromotionCounterObject promotionCounterObject) {
		return reportIncidentService.getPromotionCounter(promotionCounterObject);
	}

	public Map<String, Object> requestPromotion(PromotionCounterObject promotionCounterObject, boolean resetFlag) {
		return reportIncidentService.requestPromotion(promotionCounterObject, resetFlag);
	}

	public Map<String, Object> addClientCustomer(String clientId, String email) {
		notificationService
				.addNotification(new Notification(clientId, email + " subscribed your updates.", false, new Date()));
		return reportIncidentService.addClientCustomer(clientId, email, email);
	}

	public Map<String, Object> removeClientCustomer(String clientId, String email) {
		return reportIncidentService.removeClientCustomer(clientId, email, email);
	}

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
