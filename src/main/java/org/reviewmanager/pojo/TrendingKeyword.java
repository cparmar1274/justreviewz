package org.reviewmanager.pojo;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonAutoDetect(fieldVisibility=Visibility.ANY)
public class TrendingKeyword {
	
	@JsonProperty("keyword")
	public String keyword;
	@JsonProperty("count")
	public Integer count;
	@JsonProperty("averageRating")
	public Double averageRating;
	@JsonProperty(value="positiveReview")
	public boolean positiveReview;
	
	public TrendingKeyword() {
		super();
	}
	public TrendingKeyword(String keyword, Integer count, Double averageRating) {
		super();
		this.keyword = keyword;
		this.count = count;
		this.averageRating = averageRating;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public Double getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}
	
	public boolean isPositiveReview() {
		return this.averageRating > ReviewManagerConstants.POSITIVE_REVIEW_THRESHOLD;
	}

	public void setPositiveReview(boolean positiveReview) {
		this.positiveReview = positiveReview;
	}
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
