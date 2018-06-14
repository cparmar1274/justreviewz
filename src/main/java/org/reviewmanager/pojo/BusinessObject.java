package org.reviewmanager.pojo;

import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect(fieldVisibility = Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class BusinessObject {

	@JsonProperty(value = "clientUserName")
	public String clientUserName;

	@JsonProperty("businessName")
	public String businessName;

	@JsonProperty("rating")
	public Double rating;

	@JsonProperty("address")
	public Address address;

	@JsonProperty(value = "positiveReview")
	public boolean positiveReview;

	public BusinessObject() {
		super();
	}

	public String getClientUserName() {
		return clientUserName;
	}

	public void setClientUserName(String clientUserName) {
		this.clientUserName = clientUserName;
	}

	public BusinessObject(String clientUserName, String businessName, Double rating, Address address,
			boolean positiveReview) {
		super();
		this.clientUserName = clientUserName;
		this.businessName = businessName;
		this.rating = rating;
		this.address = address;
		this.positiveReview = positiveReview;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public boolean isPositiveReview() {
		return this.rating > ReviewManagerConstants.POSITIVE_REVIEW_THRESHOLD;
	}

	public void setPositiveReview(boolean positiveReview) {
		this.positiveReview = positiveReview;
	}

	public Map<String, Object> getBusinessObjectMap() {
		return RMUtil.getMap(this);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((businessName == null) ? 0 : businessName.hashCode());
		result = prime * result + ((clientUserName == null) ? 0 : clientUserName.hashCode());
		result = prime * result + (positiveReview ? 1231 : 1237);
		result = prime * result + ((rating == null) ? 0 : rating.hashCode());
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
		BusinessObject other = (BusinessObject) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (businessName == null) {
			if (other.businessName != null)
				return false;
		} else if (!businessName.equals(other.businessName))
			return false;
		if (clientUserName == null) {
			if (other.clientUserName != null)
				return false;
		} else if (!clientUserName.equals(other.clientUserName))
			return false;
		if (positiveReview != other.positiveReview)
			return false;
		if (rating == null) {
			if (other.rating != null)
				return false;
		} else if (!rating.equals(other.rating))
			return false;
		return true;
	}

}
