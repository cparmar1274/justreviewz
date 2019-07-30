package org.reviewmanager.pojo;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

// TODO: Auto-generated Javadoc
/**
 * The Class TrendingKeyword.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class TrendingKeyword {

	/** The keyword. */
	@JsonProperty("keyword")
	public String keyword;

	/** The count. */
	@JsonProperty("count")
	public Integer count;

	/** The average rating. */
	@JsonProperty("averageRating")
	public Double averageRating;

	/** The positive review. */
	@JsonProperty(value = "positiveReview")
	public boolean positiveReview;

	/**
	 * Instantiates a new trending keyword.
	 */
	public TrendingKeyword() {
		super();
	}

	/**
	 * Instantiates a new trending keyword.
	 *
	 * @param keyword
	 *            the keyword
	 * @param count
	 *            the count
	 * @param averageRating
	 *            the average rating
	 */
	public TrendingKeyword(String keyword, Integer count, Double averageRating) {
		super();
		this.keyword = keyword;
		this.count = count;
		this.averageRating = averageRating;
	}

	/**
	 * Gets the keyword.
	 *
	 * @return the keyword
	 */
	public String getKeyword() {
		return keyword;
	}

	/**
	 * Sets the keyword.
	 *
	 * @param keyword
	 *            the new keyword
	 */
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	/**
	 * Gets the count.
	 *
	 * @return the count
	 */
	public Integer getCount() {
		return count;
	}

	/**
	 * Sets the count.
	 *
	 * @param count
	 *            the new count
	 */
	public void setCount(Integer count) {
		this.count = count;
	}

	/**
	 * Gets the average rating.
	 *
	 * @return the average rating
	 */
	public Double getAverageRating() {
		return averageRating;
	}

	/**
	 * Sets the average rating.
	 *
	 * @param averageRating
	 *            the new average rating
	 */
	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}

	/**
	 * Checks if is positive review.
	 *
	 * @return true, if is positive review
	 */
	public boolean isPositiveReview() {
		return this.averageRating > RMUtil.POSITIVE_REVIEW_THRESHOLD;
	}

	/**
	 * Sets the positive review.
	 *
	 * @param positiveReview
	 *            the new positive review
	 */
	public void setPositiveReview(boolean positiveReview) {
		this.positiveReview = positiveReview;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((averageRating == null) ? 0 : averageRating.hashCode());
		result = prime * result + ((count == null) ? 0 : count.hashCode());
		result = prime * result + ((keyword == null) ? 0 : keyword.hashCode());
		result = prime * result + (positiveReview ? 1231 : 1237);
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TrendingKeyword other = (TrendingKeyword) obj;
		if (averageRating == null) {
			if (other.averageRating != null)
				return false;
		} else if (!averageRating.equals(other.averageRating))
			return false;
		if (count == null) {
			if (other.count != null)
				return false;
		} else if (!count.equals(other.count))
			return false;
		if (keyword == null) {
			if (other.keyword != null)
				return false;
		} else if (!keyword.equals(other.keyword))
			return false;
		if (positiveReview != other.positiveReview)
			return false;
		return true;
	}

}
