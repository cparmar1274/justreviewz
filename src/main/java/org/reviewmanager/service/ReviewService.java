package org.reviewmanager.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.elasticsearch.search.sort.SortOrder;
import org.reviewmanager.interfaces.ReviewServiceInterface;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.ReviewManagerNewUser;
import org.reviewmanager.pojo.ReviewManagerUser;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.stripe.model.Customer;
import com.stripe.model.Subscription;

@Service
public class ReviewService {

	@Autowired
	@Qualifier(value="elastic")
	public ReviewServiceInterface reportIncidentService;
	
	@Autowired
	public StripePaymentService stripePaymentService; 
	
	public Map<String, Object> addReview(String reviewObject) {
		return this.addReview(RMUtil.convertToReview(reviewObject));
	}

	public Map<String, Object> addReview(ReviewObject reviewObject) {
		Map<String,Object> data = new HashMap<String,Object>();
		if(reviewObject==null) return null;
		data.putAll(reportIncidentService.addReview(reviewObject));
		
		if(!Boolean.parseBoolean(data.get("updateOfExisting").toString()))
				data.putAll(reportIncidentService.updateDashboardAndTrending(reviewObject));
		
		return data;
	}
	
	public Map<String, Object> getReviews(String username, Integer startIndex, Integer pageSize, String searchText,
			String sortType) {
		Map<String, Object> mapData = new HashMap<String, Object>();
		List<ReviewObject> data = new ArrayList<ReviewObject>();

		// sort
		String fieldName = sortType.split(":")[0].trim();
		String fieldDir = sortType.split(":")[1].trim();
		data = (List<ReviewObject>) reportIncidentService
				.getReview(searchText, username, fieldName.equalsIgnoreCase("postedDate") ? "postedDate" : "totalStars",
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

	public Map<String, Object> getDashboardChartData(String username) {
		return reportIncidentService.getDashboardObject(username);
	}

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

	public Map<String, Object> addUser(ReviewManagerNewUser newUserRequest) {
		return reportIncidentService.addUser(newUserRequest);
	}

	public Map<String, Object> getUser(String userNameField, String userNameValue) {
		return reportIncidentService.getUser(userNameField, userNameValue);
	}

	public Map<String, Object> updateUser(String clientId, ReviewManagerUser user) {
		return reportIncidentService.updateUser(clientId, user);
	}

	public Map<String, Object> addActionItem(String reviewId) {
		return reportIncidentService.addActionItem(reviewId);
	}
	
	public Map<String, Object> removeActionItem(String reviewId) {
		return reportIncidentService.removeActionItem(reviewId);
	}

	public Map<String, Object> getActionItem(String username) {
		return reportIncidentService.getActionItem(StringUtils.EMPTY, username, "postedDate", SortOrder.DESC);
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

	public Customer createStripeUser(String clientEmail) {
		return stripePaymentService.createStripeUser(clientEmail);
	}

	public Map<String,Object> getInvoiceDetail() {
		return stripePaymentService.getInvoiceDetail();
	}

	public Map<String,Object> getBillingDetail() {
		return stripePaymentService.getBillingDetail();
	}

	public Map<String, Object> changePassword(String newPassword, String oldPassword) {
		return reportIncidentService.changePassword(newPassword,oldPassword);
	}
	
	public Map<String, Object> resetPassword(String clientEmail) {
		return reportIncidentService.resetPassword(clientEmail);
	}

	public Subscription createSubscription() {
		return stripePaymentService.createSubscription();
		
	}

}
