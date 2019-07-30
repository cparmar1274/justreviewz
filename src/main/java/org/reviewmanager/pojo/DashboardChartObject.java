package org.reviewmanager.pojo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class DashboardChartObject.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class DashboardChartObject {

	/** The rating date. */
	@JsonProperty("ratingDate")
	public Date ratingDate;

	/** The overall rating. */
	@JsonProperty("overallRating")
	public String overallRating;

	/** The google rating. */
	@JsonProperty("googleRating")
	public String googleRating;

	/** The facebook rating. */
	@JsonProperty("facebookRating")
	public String facebookRating;

	/** The yelp rating. */
	@JsonProperty("yelpRating")
	public String yelpRating;

	/**
	 * Instantiates a new dashboard chart object.
	 *
	 * @param ratingDate
	 *            the rating date
	 * @param googleRating
	 *            the google rating
	 * @param facebookRating
	 *            the facebook rating
	 * @param yelpRating
	 *            the yelp rating
	 */
	public DashboardChartObject(Date ratingDate, String googleRating, String facebookRating, String yelpRating) {
		super();
		this.ratingDate = ratingDate;
		this.googleRating = googleRating;
		this.facebookRating = facebookRating;
		this.yelpRating = yelpRating;
	}

	/**
	 * Gets the rating date.
	 *
	 * @return the rating date
	 */
	public Date getRatingDate() {
		return ratingDate;
	}

	/**
	 * Sets the rating date.
	 *
	 * @param ratingDate
	 *            the new rating date
	 */
	public void setRatingDate(Date ratingDate) {
		this.ratingDate = ratingDate;
	}

	/**
	 * Gets the google rating.
	 *
	 * @return the google rating
	 */
	public String getGoogleRating() {
		return googleRating;
	}

	/**
	 * Sets the google rating.
	 *
	 * @param googleRating
	 *            the new google rating
	 */
	public void setGoogleRating(String googleRating) {
		this.googleRating = googleRating;
	}

	/**
	 * Gets the facebook rating.
	 *
	 * @return the facebook rating
	 */
	public String getFacebookRating() {
		return facebookRating;
	}

	/**
	 * Sets the facebook rating.
	 *
	 * @param facebookRating
	 *            the new facebook rating
	 */
	public void setFacebookRating(String facebookRating) {
		this.facebookRating = facebookRating;
	}

	/**
	 * Gets the yelp rating.
	 *
	 * @return the yelp rating
	 */
	public String getYelpRating() {
		return yelpRating;
	}

	/**
	 * Sets the yelp rating.
	 *
	 * @param yelpRating
	 *            the new yelp rating
	 */
	public void setYelpRating(String yelpRating) {
		this.yelpRating = yelpRating;
	}

	/**
	 * Gets the overall rating.
	 *
	 * @return the overall rating
	 */
	public String getOverallRating() {
		return String.valueOf((Double.parseDouble(this.facebookRating) + Double.parseDouble(this.yelpRating)
				+ Double.parseDouble(this.googleRating)) / 3).substring(0, 3);
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
		result = prime * result + ((facebookRating == null) ? 0 : facebookRating.hashCode());
		result = prime * result + ((googleRating == null) ? 0 : googleRating.hashCode());
		result = prime * result + ((overallRating == null) ? 0 : overallRating.hashCode());
		result = prime * result + ((ratingDate == null) ? 0 : ratingDate.hashCode());
		result = prime * result + ((yelpRating == null) ? 0 : yelpRating.hashCode());
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
		DashboardChartObject other = (DashboardChartObject) obj;
		if (facebookRating == null) {
			if (other.facebookRating != null)
				return false;
		} else if (!facebookRating.equals(other.facebookRating))
			return false;
		if (googleRating == null) {
			if (other.googleRating != null)
				return false;
		} else if (!googleRating.equals(other.googleRating))
			return false;
		if (overallRating == null) {
			if (other.overallRating != null)
				return false;
		} else if (!overallRating.equals(other.overallRating))
			return false;
		if (ratingDate == null) {
			if (other.ratingDate != null)
				return false;
		} else if (!ratingDate.equals(other.ratingDate))
			return false;
		if (yelpRating == null) {
			if (other.yelpRating != null)
				return false;
		} else if (!yelpRating.equals(other.yelpRating))
			return false;
		return true;
	}

}
