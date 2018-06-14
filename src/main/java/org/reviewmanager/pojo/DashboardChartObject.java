package org.reviewmanager.pojo;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class DashboardChartObject {

	@JsonProperty("ratingDate")
	public String ratingDate;

	@JsonProperty("overallRating")
	public String overallRating;

	@JsonProperty("googleRating")
	public String googleRating;

	@JsonProperty("facebookRating")
	public String facebookRating;

	@JsonProperty("yelpRating")
	public String yelpRating;

	public DashboardChartObject(String ratingDate, String googleRating, String facebookRating, String yelpRating) {
		super();
		this.ratingDate = ratingDate;
		this.googleRating = googleRating;
		this.facebookRating = facebookRating;
		this.yelpRating = yelpRating;
	}

	public String getRatingDate() {
		return ratingDate;
	}

	public void setRatingDate(String ratingDate) {
		this.ratingDate = ratingDate;
	}

	public String getGoogleRating() {
		return googleRating;
	}

	public void setGoogleRating(String googleRating) {
		this.googleRating = googleRating;
	}

	public String getFacebookRating() {
		return facebookRating;
	}

	public void setFacebookRating(String facebookRating) {
		this.facebookRating = facebookRating;
	}

	public String getYelpRating() {
		return yelpRating;
	}

	public void setYelpRating(String yelpRating) {
		this.yelpRating = yelpRating;
	}

	public String getOverallRating() {
		return String.valueOf((Double.parseDouble(this.facebookRating) + Double.parseDouble(this.yelpRating)
				+ Double.parseDouble(this.googleRating)) / 3).substring(0, 3);
	}

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
