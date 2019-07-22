package org.reviewmanager.service;

import java.util.LinkedList;
import java.util.Queue;

import org.reviewmanager.pojo.PromotionObject;
import org.reviewmanager.pojo.QueryObject;
import org.reviewmanager.pojo.ReviewObject;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class RMRecentService.
 */
@Service
public class RMRecentService {

	/** The latest reviews. */
	public Queue<ReviewObject> latestReviews;
	
	/** The latest queries. */
	public Queue<QueryObject> latestQueries;
	
	/** The latest promotions. */
	public Queue<PromotionObject> latestPromotions;
	
	/** The Constant RECENT_COUNTER. */
	public static final Integer RECENT_COUNTER = 25;
	
	/**
	 * Instantiates a new RM recent service.
	 */
	public RMRecentService() {
		super();
		latestReviews = new LinkedList<ReviewObject>();
		latestQueries = new LinkedList<QueryObject>();
		latestPromotions = new LinkedList<PromotionObject>();
	}
	
	/**
	 * Adds the review object.
	 *
	 * @param reviewObject the review object
	 * @return the review object
	 */
	public boolean addReviewObject(ReviewObject reviewObject) {
		if(latestReviews.size()>=RECENT_COUNTER) latestReviews.remove();
		return latestReviews.add(reviewObject);
	}
	
	/**
	 * Adds the query object.
	 *
	 * @param queryObject the query object
	 * @return the query object
	 */
	public boolean addQueryObject(QueryObject queryObject) {
		if(latestQueries.size()>=RECENT_COUNTER) latestQueries.remove();
		return latestQueries.add(queryObject);
	}
	
	/**
	 * Adds the promotion object.
	 *
	 * @param promotionObject the promotion object
	 * @return the promotion object
	 */
	public boolean addPromotionObject(PromotionObject promotionObject) {
		if(latestPromotions.size()>=RECENT_COUNTER) latestPromotions.remove();
		return latestPromotions.add(promotionObject);
	}

	/**
	 * Gets the latest reviews.
	 *
	 * @return the latest reviews
	 */
	public Queue<ReviewObject> getLatestReviews() {
		return latestReviews;
	}

	/**
	 * Gets the latest queries.
	 *
	 * @return the latest queries
	 */
	public Queue<QueryObject> getLatestQueries() {
		return latestQueries;
	}

	/**
	 * Gets the latest promotions.
	 *
	 * @return the latest promotions
	 */
	public Queue<PromotionObject> getLatestPromotions() {
		return latestPromotions;
	}
	
	
	
}
