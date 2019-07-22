package org.reviewmanager.interfaces;

import java.util.Map;

import org.reviewmanager.pojo.ReviewObject;

// TODO: Auto-generated Javadoc
/**
 * The Interface ReviewInterface.
 */
public interface ReviewInterface {

	/**
	 * Gets the reviews.
	 *
	 * @param businessName the business name
	 * @param reviewContent the review content
	 * @return the reviews
	 */
	public Map<String, ReviewObject> getReviews(String businessName, String reviewContent);

	/**
	 * Adds the review.
	 *
	 * @param reviewContent the review content
	 * @param clientName the client name
	 * @param totalStars the total stars
	 * @param postedBy the posted by
	 * @return the map
	 */
	public Map<String, Object> addReview(String reviewContent, String clientName, String totalStars, String postedBy);

	/**
	 * Edits the review.
	 *
	 * @param businessName the business name
	 * @param updatedReviewContent the updated review content
	 * @return the map
	 */
	public Map<String, Object> editReview(String businessName, String updatedReviewContent);

	/**
	 * Delete review.
	 *
	 * @param businessName the business name
	 * @param reviewID the review ID
	 * @return the map
	 */
	public Map<String, Object> deleteReview(String businessName, String reviewID);

}
