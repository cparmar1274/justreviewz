package org.reviewmanager.pojo;

import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class BusinessObject.
 */
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class BusinessObject {

	/** The client id. */
	@JsonProperty(value = "clientId")
	public String clientId;

	/** The business name. */
	@JsonProperty("businessName")
	public String businessName;

	/** The rating. */
	@JsonProperty("rating")
	public Double rating;

	/** The address. */
	@JsonProperty("address")
	public Address address;

	/** The positive review. */
	@JsonProperty(value = "positiveReview")
	public boolean positiveReview;

	/**
	 * Instantiates a new business object.
	 */
	public BusinessObject() {
		super();
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
	 * Instantiates a new business object.
	 *
	 * @param clientId the client id
	 * @param businessName the business name
	 * @param rating the rating
	 * @param address the address
	 * @param positiveReview the positive review
	 */
	public BusinessObject(String clientId, String businessName, Double rating, Address address,
			boolean positiveReview) {
		super();
		this.clientId = clientId;
		this.businessName = businessName;
		this.rating = rating;
		this.address = address;
		this.positiveReview = positiveReview;
	}

	/**
	 * Gets the business name.
	 *
	 * @return the business name
	 */
	public String getBusinessName() {
		return businessName;
	}

	/**
	 * Sets the business name.
	 *
	 * @param businessName the new business name
	 */
	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	/**
	 * Gets the rating.
	 *
	 * @return the rating
	 */
	public Double getRating() {
		return rating;
	}

	/**
	 * Sets the rating.
	 *
	 * @param rating the new rating
	 */
	public void setRating(Double rating) {
		this.rating = rating;
	}

	/**
	 * Gets the address.
	 *
	 * @return the address
	 */
	public Address getAddress() {
		return address;
	}

	/**
	 * Sets the address.
	 *
	 * @param address the new address
	 */
	public void setAddress(Address address) {
		this.address = address;
	}

	/**
	 * Checks if is positive review.
	 *
	 * @return true, if is positive review
	 */
	public boolean isPositiveReview() {
		return this.rating > RMUtil.POSITIVE_REVIEW_THRESHOLD;
	}

	/**
	 * Sets the positive review.
	 *
	 * @param positiveReview the new positive review
	 */
	public void setPositiveReview(boolean positiveReview) {
		this.positiveReview = positiveReview;
	}

	/**
	 * Gets the business object map.
	 *
	 * @return the business object map
	 */
	public Map<String, Object> getBusinessObjectMap() {
		return RMUtil.getMap(this);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((businessName == null) ? 0 : businessName.hashCode());
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + (positiveReview ? 1231 : 1237);
		result = prime * result + ((rating == null) ? 0 : rating.hashCode());
		return result;
	}

	/* (non-Javadoc)
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
		if (clientId == null) {
			if (other.clientId != null)
				return false;
		} else if (!clientId.equals(other.clientId))
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
