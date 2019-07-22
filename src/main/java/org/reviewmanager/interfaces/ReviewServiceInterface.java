package org.reviewmanager.interfaces;

import java.util.Map;

import org.elasticsearch.search.sort.SortOrder;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.EmailNotificationObject;
import org.reviewmanager.pojo.ProductObject;
import org.reviewmanager.pojo.PromotionCounterObject;
import org.reviewmanager.pojo.PromotionObject;
import org.reviewmanager.pojo.QueryObject;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.SearchBusinessObject;
import org.reviewmanager.users.BusinessUser;
import org.reviewmanager.users.BusinessUserTemp;

// TODO: Auto-generated Javadoc
/**
 * The Interface ReviewServiceInterface.
 */
public interface ReviewServiceInterface {

	/**
	 * Adds the review.
	 *
	 * @param reviewObject the review object
	 * @return the map
	 */
	Map<String, Object> addReview(ReviewObject reviewObject);

	/**
	 * Adds the competitor.
	 *
	 * @param businessObject the business object
	 * @return the map
	 */
	Map<String, Object> addCompetitor(BusinessObject businessObject);

	/**
	 * Adds the user.
	 *
	 * @param newUserRequest the new user request
	 * @return the map
	 */
	Map<String, Object> addUser(BusinessUserTemp newUserRequest);

	/**
	 * Gets the user.
	 *
	 * @param userNameField the user name field
	 * @param userNameValue the user name value
	 * @return the user
	 */
	Map<String, Object> getUser(String userNameField, String userNameValue);

	/**
	 * Gets the competitor.
	 *
	 * @param username the username
	 * @return the competitor
	 */
	Map<String, Object> getCompetitor(String username);

	/**
	 * Gets the performers.
	 *
	 * @param username the username
	 * @return the performers
	 */
	Map<String, Object> getPerformers(String username);

	/**
	 * Gets the review.
	 *
	 * @param reviewContent the review content
	 * @param username the username
	 * @param sortBy the sort by
	 * @param sortType the sort type
	 * @return the review
	 */
	Map<String, Object> getReview(String reviewContent, String username, String sortBy, SortOrder sortType);

	/**
	 * Gets the dashboard object.
	 *
	 * @param username the username
	 * @return the dashboard object
	 */
	Map<String, Object> getDashboardObject(String username);

	/**
	 * Gets the trending data.
	 *
	 * @param username the username
	 * @return the trending data
	 */
	Map<String, Object> getTrendingData(String username);

	/**
	 * Update dashboard and trending.
	 *
	 * @param reviewObject the review object
	 * @return the map
	 */
	Map<String, Object> updateDashboardAndTrending(ReviewObject reviewObject);

	/**
	 * Update user.
	 *
	 * @param clientId the client id
	 * @param user the user
	 * @return the map
	 */
	Map<String, Object> updateUser(String clientId, BusinessUser user);

	/**
	 * Adds the action item.
	 *
	 * @param reviewId the review id
	 * @return the map
	 */
	Map<String, Object> addActionItem(String reviewId);

	/**
	 * Removes the action item.
	 *
	 * @param reviewId the review id
	 * @return the map
	 */
	Map<String, Object> removeActionItem(String reviewId);

	/**
	 * Gets the action item.
	 *
	 * @param reviewContent the review content
	 * @param username the username
	 * @param sortBy the sort by
	 * @param sortType the sort type
	 * @return the action item
	 */
	Map<String, Object> getActionItem(String reviewContent, String username, String sortBy, SortOrder sortType);

	/**
	 * Log error.
	 *
	 * @param className the class name
	 * @param methodName the method name
	 * @param errorDetail the error detail
	 */
	void logError(String className, String methodName, String errorDetail);

	/**
	 * Reset password.
	 *
	 * @param clientEmail the client email
	 * @return the map
	 */
	Map<String, Object> resetPassword(String clientEmail);

	/**
	 * Change password.
	 *
	 * @param newPassword the new password
	 * @param oldPassword the old password
	 * @return the map
	 */
	Map<String, Object> changePassword(String newPassword, String oldPassword);

	/**
	 * Adds the public review.
	 *
	 * @param reviewObject the review object
	 * @return the map
	 */
	// public Reviews
	Map<String, Object> addPublicReview(ReviewObject reviewObject);

	/**
	 * Gets the public reviews.
	 *
	 * @param reviewObject the review object
	 * @param sortingOrder the sorting order
	 * @return the public reviews
	 */
	Map<String, Object> getPublicReviews(ReviewObject reviewObject, String sortingOrder);

	/**
	 * Gets the public replies.
	 *
	 * @param reviewObject the review object
	 * @return the public replies
	 */
	Map<String, Object> getPublicReplies(ReviewObject reviewObject);

	/**
	 * Like comment.
	 *
	 * @param reviewId the review id
	 * @param likeFlag the like flag
	 * @return the map
	 */
	Map<String, Object> likeComment(Integer reviewId, Integer likeFlag);

	/**
	 * Dislike comment.
	 *
	 * @param reviewId the review id
	 * @param likeFlag the like flag
	 * @return the map
	 */
	Map<String, Object> dislikeComment(Integer reviewId, Integer likeFlag);

	/**
	 * Search business.
	 *
	 * @param query the query
	 * @param type the type
	 * @return the map
	 */
	Map<String, Object> searchBusiness(String query, String type);

	/**
	 * Search location.
	 *
	 * @param query the query
	 * @param type the type
	 * @return the map
	 */
	Map<String, Object> searchLocation(String query, String type);

	/**
	 * Adds the public query.
	 *
	 * @param queryObject the query object
	 * @return the map
	 */
	Map<String, Object> addPublicQuery(QueryObject queryObject);

	/**
	 * Gets the public query.
	 *
	 * @param queryObject the query object
	 * @return the public query
	 */
	Map<String, Object> getPublicQuery(QueryObject queryObject);

	/**
	 * Gets the business customers.
	 *
	 * @param clientId the client id
	 * @return the business customers
	 */
	Map<String, Integer> getBusinessCustomers(String clientId);

	/**
	 * Gets the promotion.
	 *
	 * @param promotionObject the promotion object
	 * @param filter the filter
	 * @return the promotion
	 */
	Map<String, Object> getPromotion(PromotionObject promotionObject,boolean filter);

	/**
	 * Adds the promotion.
	 *
	 * @param promotionObject the promotion object
	 * @return the map
	 */
	Map<String, Object> addPromotion(PromotionObject promotionObject);

	/**
	 * Gets the promotion counter.
	 *
	 * @param promotionCounterObject the promotion counter object
	 * @return the promotion counter
	 */
	Map<String, Object> getPromotionCounter(PromotionCounterObject promotionCounterObject);

	/**
	 * Request promotion.
	 *
	 * @param promotionCounterObject the promotion counter object
	 * @param resetFlag the reset flag
	 * @return the map
	 */
	Map<String, Object> requestPromotion(PromotionCounterObject promotionCounterObject, boolean resetFlag);

	/**
	 * Adds the client customer.
	 *
	 * @param clientId the client id
	 * @param postedEmail the posted email
	 * @param postedBy the posted by
	 * @return the map
	 */
	Map<String, Object> addClientCustomer(String clientId, String postedEmail, String postedBy);

	/**
	 * Removes the client customer.
	 *
	 * @param clientId the client id
	 * @param email the email
	 * @param email2 the email 2
	 * @return the map
	 */
	Map<String, Object> removeClientCustomer(String clientId, String email, String email2);

	/**
	 * Register new business.
	 *
	 * @param searchBusinessObject the search business object
	 * @return the map
	 */
	Map<String, Object> registerNewBusiness(SearchBusinessObject searchBusinessObject);

	ReviewObject getReviewId(String reviewId);

	Map<String, Object> sendDiscount(EmailNotificationObject emailObject);

	Map<String, Object> postProduct(ProductObject productObject);

	Map<String, Object> getProduct(ProductObject productObject);

	ProductObject getProductById(String string, String productId);

}