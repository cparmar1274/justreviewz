package org.reviewmanager.pojo;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class Trending.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Trending {

	/** The client id. */
	@JsonProperty(value = "clientId")
	public String clientId;

	/** The trending keywords. */
	@JsonProperty("trendingKeywords")
	public Map<String, TrendingKeyword> trendingKeywords;

	@JsonProperty("totalUpdated")
	public Date lastUpdated;

	/**
	 * Instantiates a new trending.
	 */
	public Trending() {
		super();
		// TODO Auto-generated constructor stub
		this.trendingKeywords = new HashMap<String, TrendingKeyword>();
		this.lastUpdated = new Date();
	}

	/**
	 * Instantiates a new trending.
	 *
	 * @param clientId
	 *            the client id
	 * @param trendingKeywords
	 *            the trending keywords
	 */
	public Trending(String clientId, HashMap<String, TrendingKeyword> trendingKeywords) {
		super();
		this.clientId = clientId;
		this.trendingKeywords = trendingKeywords;
		this.lastUpdated = new Date();
	}

	/**
	 * Sets the trending keywords.
	 *
	 * @param trendingKeywords
	 *            the trending keywords
	 */
	public void setTrendingKeywords(Map<String, TrendingKeyword> trendingKeywords) {
		this.trendingKeywords = trendingKeywords;
	}

	/**
	 * Gets the trending keywords.
	 *
	 * @return the trending keywords
	 */
	public Map<String, TrendingKeyword> getTrendingKeywords() {
		return trendingKeywords;
	}

	/**
	 * Analyse review.
	 *
	 * @param reviewContent
	 *            the review content
	 * @param averageRating
	 *            the average rating
	 * @return true, if successful
	 */
	public boolean analyseReview(String reviewContent, Double averageRating) {
		TrendingKeyword trending = null;
		String keyword = null;
		for (String key : reviewContent.split(" ")) {
			keyword = key.replaceAll("[^a-zA-Z0-9$+]", "");
			if (keyword.length() < 4)
				continue;
			trending = new TrendingKeyword(keyword, 1, averageRating);
			if (this.trendingKeywords.containsKey(keyword.toLowerCase())) {
				trending = this.trendingKeywords.get(keyword.toLowerCase());
				trending.setCount(trending.getCount() + 1);
				trending.setAverageRating((averageRating + trending.getAverageRating()) / 2);

			} else {
				this.trendingKeywords.put(keyword.toLowerCase(), trending);
			}

		}
		return true;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	/**
	 * Gets the trending map.
	 *
	 * @return the trending map
	 */
	public Map<String, Object> getTrendingMap() {
		return RMUtil.getMap(this);
	}

	/**
	 * Gets the client id.
	 *
	 * @return the client id
	 */
	public String getClientId() {
		return clientId;
	}

	/**
	 * Sets the client id.
	 *
	 * @param clientId
	 *            the new client id
	 */
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((lastUpdated == null) ? 0 : lastUpdated.hashCode());
		result = prime * result + ((trendingKeywords == null) ? 0 : trendingKeywords.hashCode());
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
		Trending other = (Trending) obj;
		if (clientId == null) {
			if (other.clientId != null)
				return false;
		} else if (!clientId.equals(other.clientId))
			return false;
		if (lastUpdated == null) {
			if (other.lastUpdated != null)
				return false;
		} else if (!lastUpdated.equals(other.lastUpdated))
			return false;
		if (trendingKeywords == null) {
			if (other.trendingKeywords != null)
				return false;
		} else if (!trendingKeywords.equals(other.trendingKeywords))
			return false;
		return true;
	}

}
