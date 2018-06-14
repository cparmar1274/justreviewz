package org.reviewmanager.pojo;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Dashboard {

	@JsonProperty(value = "clientUserName")
	public String clientUserName;

	@JsonProperty("totalRating")
	public Double totalRating;

	@JsonProperty("totalPositive")
	public Integer totalPositive;

	@JsonProperty("totalNegative")
	public Integer totalNegative;

	@JsonProperty("totalNeutral")
	public Integer totalNeutral;

	@JsonProperty("dashboardChartData")
	public List<DashboardChartObject> dashboardChartData;

	public Dashboard() {
		super();
		this.dashboardChartData = new LinkedList<DashboardChartObject>();
	}

	public Dashboard(String clientUserName, Double totalRating, Integer totalPositive, Integer totalNegative,
			Integer totalNeutral, List<DashboardChartObject> dashboardChartData) {
		super();
		this.clientUserName = clientUserName;
		this.totalRating = totalRating;
		this.totalPositive = totalPositive;
		this.totalNegative = totalNegative;
		this.totalNeutral = totalNeutral;
		this.dashboardChartData = dashboardChartData;
	}

	public String getClientUserName() {
		return clientUserName;
	}

	public void setClientUserName(String clientUserName) {
		this.clientUserName = clientUserName;
	}

	public Integer getTotalPositive() {
		return totalPositive;
	}

	public void setTotalPositive(Integer totalPositive) {
		this.totalPositive = totalPositive;
	}

	public Integer getTotalNegative() {
		return totalNegative;
	}

	public void setTotalNegative(Integer totalNegative) {
		this.totalNegative = totalNegative;
	}

	public Integer getTotalNeutral() {
		return totalNeutral;
	}

	public void setTotalNeutral(Integer totalNeutral) {
		this.totalNeutral = totalNeutral;
	}

	public List<DashboardChartObject> getDashboardChartData() {
		if (dashboardChartData == null) {
			dashboardChartData = new ArrayList<DashboardChartObject>();
		}
		return dashboardChartData;
	}

	public void setDashboardChartData(List<DashboardChartObject> dashboardChartData) {
		this.dashboardChartData = dashboardChartData;
	}

	public Double getTotalRating() {
		return totalRating;
	}

	public void setTotalRating(Double totalRating) {
		this.totalRating = totalRating;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clientUserName == null) ? 0 : clientUserName.hashCode());
		result = prime * result + ((dashboardChartData == null) ? 0 : dashboardChartData.hashCode());
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
		if (clientUserName == null) {
			if (other.clientUserName != null)
				return false;
		} else if (!clientUserName.equals(other.clientUserName))
			return false;
		if (dashboardChartData == null) {
			if (other.dashboardChartData != null)
				return false;
		} else if (!dashboardChartData.equals(other.dashboardChartData))
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

	public Map<String, Object> getDashboardMap() {
		return RMUtil.getMap(this);
	}

}
