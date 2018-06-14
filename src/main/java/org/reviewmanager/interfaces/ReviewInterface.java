package org.reviewmanager.interfaces;

import java.util.Map;

import org.reviewmanager.pojo.ReviewObject;

public interface ReviewInterface {

	public Map<String, ReviewObject> getReviews(String businessName, String reviewContent);

	public Map<String, Object> addReview(String reviewContent, String clientName, String totalStars, String postedBy);

	public Map<String, Object> editReview(String businessName, String updatedReviewContent);

	public Map<String, Object> deleteReview(String businessName, String reviewID);

}
