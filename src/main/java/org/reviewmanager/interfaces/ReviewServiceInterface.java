package org.reviewmanager.interfaces;

import java.util.Map;

import org.elasticsearch.search.sort.SortOrder;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.ReviewManagerNewUser;
import org.reviewmanager.pojo.ReviewManagerUser;
import org.reviewmanager.pojo.ReviewObject;

public interface ReviewServiceInterface {

	Map<String, Object> addReview(ReviewObject reviewObject);

	Map<String, Object> addCompetitor(BusinessObject businessObject);

	Map<String, Object> addUser(ReviewManagerNewUser newUserRequest);

	Map<String, Object> getUser(String userNameField, String userNameValue);

	Map<String, Object> getCompetitor(String username);

	Map<String, Object> getPerformers(String username);

	Map<String, Object> getReview(String reviewContent, String username, String sortBy, SortOrder sortType);

	Map<String, Object> getDashboardObject(String username);

	Map<String, Object> getTrendingData(String username);

	Map<String, Object> updateDashboardAndTrending(ReviewObject reviewObject);

	Map<String, Object> updateUser(String clientId, ReviewManagerUser user);

	Map<String, Object> addActionItem(String reviewId);

	Map<String, Object> removeActionItem(String reviewId);

	Map<String, Object> getActionItem(String reviewContent, String username, String sortBy, SortOrder sortType);

	void logError(String className, String methodName, String errorDetail);

	Map<String, Object> resetPassword(String clientEmail);

	Map<String, Object> changePassword(String newPassword, String oldPassword);

}