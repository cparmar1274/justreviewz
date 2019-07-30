package org.reviewmanager.pojo;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class SearchBusinessObject.
 */
@JsonIgnoreProperties(ignoreUnknown = true, allowGetters = false, allowSetters = false)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class SearchBusinessObject {

	/** The client name. */
	@JsonProperty("clientName")
	public String clientName;

	/** The client type. */
	@JsonProperty("clientType")
	public String clientType;

	/** The client email. */
	@JsonProperty("clientEmail")
	public String clientEmail;

	/** The client business phone number. */
	@JsonProperty("clientBusinessPhoneNumber")
	public String clientBusinessPhoneNumber;

	/** The address. */
	@JsonProperty("address")
	public Address address;

	/**
	 * Instantiates a new search business object.
	 */
	public SearchBusinessObject() {
		super();
	}

	/**
	 * Gets the client name.
	 *
	 * @return the client name
	 */
	public String getClientName() {
		return clientName;
	}

	/**
	 * Sets the client name.
	 *
	 * @param clientName
	 *            the new client name
	 */
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	/**
	 * Gets the client type.
	 *
	 * @return the client type
	 */
	public String getClientType() {
		return clientType;
	}

	/**
	 * Sets the client type.
	 *
	 * @param clientType
	 *            the new client type
	 */
	public void setClientType(String clientType) {
		this.clientType = clientType;
	}

	/**
	 * Gets the client email.
	 *
	 * @return the client email
	 */
	public String getClientEmail() {
		return clientEmail;
	}

	/**
	 * Sets the client email.
	 *
	 * @param clientEmail
	 *            the new client email
	 */
	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}

	/**
	 * Gets the client business phone number.
	 *
	 * @return the client business phone number
	 */
	public String getClientBusinessPhoneNumber() {
		return clientBusinessPhoneNumber;
	}

	/**
	 * Sets the client business phone number.
	 *
	 * @param clientBusinessPhoneNumber
	 *            the new client business phone number
	 */
	public void setClientBusinessPhoneNumber(String clientBusinessPhoneNumber) {
		this.clientBusinessPhoneNumber = clientBusinessPhoneNumber;
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
	 * @param address
	 *            the new address
	 */
	public void setAddress(Address address) {
		this.address = address;
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
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((clientBusinessPhoneNumber == null) ? 0 : clientBusinessPhoneNumber.hashCode());
		result = prime * result + ((clientEmail == null) ? 0 : clientEmail.hashCode());
		result = prime * result + ((clientName == null) ? 0 : clientName.hashCode());
		result = prime * result + ((clientType == null) ? 0 : clientType.hashCode());
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
		SearchBusinessObject other = (SearchBusinessObject) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (clientBusinessPhoneNumber == null) {
			if (other.clientBusinessPhoneNumber != null)
				return false;
		} else if (!clientBusinessPhoneNumber.equals(other.clientBusinessPhoneNumber))
			return false;
		if (clientEmail == null) {
			if (other.clientEmail != null)
				return false;
		} else if (!clientEmail.equals(other.clientEmail))
			return false;
		if (clientName == null) {
			if (other.clientName != null)
				return false;
		} else if (!clientName.equals(other.clientName))
			return false;
		if (clientType == null) {
			if (other.clientType != null)
				return false;
		} else if (!clientType.equals(other.clientType))
			return false;
		return true;
	}

}
