package org.reviewmanager.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class Dashboard.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Dashboard {

	/** The client id. */
	@JsonProperty(value = "clientId")
	public String clientId;

	/** The total rating. */
	@JsonProperty("totalRating")
	public Double totalRating;

	/** The total positive. */
	@JsonProperty("totalPositive")
	public Integer totalPositive;

	/** The total negative. */
	@JsonProperty("totalNegative")
	public Integer totalNegative;

	/** The total neutral. */
	@JsonProperty("totalNeutral")
	public Integer totalNeutral;

	/** The dashboard chart data. */
	@JsonProperty("dashboardChartData")
	public List<DashboardChartObject> dashboardChartData;
	
	@JsonProperty("totalUpdated")
	public Date lastUpdated;

	/**
	 * Instantiates a new dashboard.
	 */
	public Dashboard() {
		super();
		this.dashboardChartData = new LinkedList<DashboardChartObject>();
	}

	/**
	 * Instantiates a new dashboard.
	 *
	 * @param clientId the client id
	 * @param totalRating the total rating
	 * @param totalPositive the total positive
	 * @param totalNegative the total negative
	 * @param totalNeutral the total neutral
	 * @param dashboardChartData the dashboard chart data
	 */
	public Dashboard(String clientId, Double totalRating, Integer totalPositive, Integer totalNegative,
			Integer totalNeutral, List<DashboardChartObject> dashboardChartData) {
		super();
		this.clientId = clientId;
		this.totalRating = totalRating;
		this.totalPositive = totalPositive;
		this.totalNegative = totalNegative;
		this.totalNeutral = totalNeutral;
		this.dashboardChartData = dashboardChartData;
		this.lastUpdated = new Date();
	}

	/**
	 * Gets the total positive.
	 *
	 * @return the total positive
	 */
	public Integer getTotalPositive() {
		return totalPositive;
	}

	/**
	 * Sets the total positive.
	 *
	 * @param totalPositive the new total positive
	 */
	public void setTotalPositive(Integer totalPositive) {
		this.totalPositive = totalPositive;
	}

	/**
	 * Gets the total negative.
	 *
	 * @return the total negative
	 */
	public Integer getTotalNegative() {
		return totalNegative;
	}

	/**
	 * Sets the total negative.
	 *
	 * @param totalNegative the new total negative
	 */
	public void setTotalNegative(Integer totalNegative) {
		this.totalNegative = totalNegative;
	}

	/**
	 * Gets the total neutral.
	 *
	 * @return the total neutral
	 */
	public Integer getTotalNeutral() {
		return totalNeutral;
	}

	/**
	 * Sets the total neutral.
	 *
	 * @param totalNeutral the new total neutral
	 */
	public void setTotalNeutral(Integer totalNeutral) {
		this.totalNeutral = totalNeutral;
	}

	/**
	 * Gets the dashboard chart data.
	 *
	 * @return the dashboard chart data
	 */
	public List<DashboardChartObject> getDashboardChartData() {
		if (dashboardChartData == null) {
			dashboardChartData = new ArrayList<DashboardChartObject>();
		}
		return dashboardChartData;
	}

	/**
	 * Sets the dashboard chart data.
	 *
	 * @param dashboardChartData the new dashboard chart data
	 */
	public void setDashboardChartData(List<DashboardChartObject> dashboardChartData) {
		this.dashboardChartData = dashboardChartData;
	}

	/**
	 * Gets the total rating.
	 *
	 * @return the total rating
	 */
	public Double getTotalRating() {
		return totalRating;
	}

	/**
	 * Sets the total rating.
	 *
	 * @param totalRating the new total rating
	 */
	public void setTotalRating(Double totalRating) {
		this.totalRating = totalRating;
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
	 * @param clientId the new client id
	 */
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	/**
	 * Gets the dashboard map.
	 *
	 * @return the dashboard map
	 */
	public Map<String, Object> getDashboardMap() {
		return RMUtil.getMap(this);
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((dashboardChartData == null) ? 0 : dashboardChartData.hashCode());
		result = prime * result + ((lastUpdated == null) ? 0 : lastUpdated.hashCode());
		result = prime * result + ((totalNegative == null) ? 0 : totalNegative.hashCode());
		result = prime * result + ((totalNeutral == null) ? 0 : totalNeutral.hashCode());
		result = prime * result + ((totalPositive == null) ? 0 : totalPositive.hashCode());
		result = prime * result + ((totalRating == null) ? 0 : totalRating.hashCode());
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
		Dashboard other = (Dashboard) obj;
		if (clientId == null) {
			if (other.clientId != null)
				return false;
		} else if (!clientId.equals(other.clientId))
			return false;
		if (dashboardChartData == null) {
			if (other.dashboardChartData != null)
				return false;
		} else if (!dashboardChartData.equals(other.dashboardChartData))
			return false;
		if (lastUpdated == null) {
			if (other.lastUpdated != null)
				return false;
		} else if (!lastUpdated.equals(other.lastUpdated))
			return false;
		if (totalNegative == null) {
			if (other.totalNegative != null)
				return false;
		} else if (!totalNegative.equals(other.totalNegative))
			return false;
		if (totalNeutral == null) {
			if (other.totalNeutral != null)
				return false;
		} else if (!totalNeutral.equals(other.totalNeutral))
			return false;
		if (totalPositive == null) {
			if (other.totalPositive != null)
				return false;
		} else if (!totalPositive.equals(other.totalPositive))
			return false;
		if (totalRating == null) {
			if (other.totalRating != null)
				return false;
		} else if (!totalRating.equals(other.totalRating))
			return false;
		return true;
	}

	

}
