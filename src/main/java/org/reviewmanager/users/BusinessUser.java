package org.reviewmanager.users;

import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

import org.reviewmanager.pojo.Address;
import org.reviewmanager.pojo.WorkingHours;
import org.reviewmanager.utility.RMUtil;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class BusinessUser.
 */
@JsonIgnoreProperties({ "password", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled" })
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE)
public class BusinessUser extends User {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The client name. */
	@JsonProperty("clientName")
	public String clientName;

	/** The client type. */
	@JsonProperty("clientType")
	public String clientType;

	/** The client id. */
	@JsonProperty("clientId")
	public String clientId;

	/** The client email. */
	@JsonProperty("clientEmail")
	public String clientEmail;

	/** The client business url. */
	@JsonProperty("clientBusinessUrl")
	public String clientBusinessUrl;

	/** The client business phone number. */
	@JsonProperty("clientBusinessPhoneNumber")
	public String clientBusinessPhoneNumber;

	/** The working hours. */
	@JsonProperty("workingHours")
	public WorkingHours workingHours;

	/** The address. */
	@JsonProperty("address")
	public Address address;

	/** The facebook url. */
	@JsonProperty("facebookUrl")
	public String facebookUrl;

	/** The yelp url. */
	@JsonProperty("yelpUrl")
	public String yelpUrl;

	/** The notify new review. */
	@JsonProperty("notifyNewReview")
	public boolean notifyNewReview;

	/** The notify new report. */
	@JsonProperty("notifyNewReport")
	public boolean notifyNewReport;

	/** The notify added as competitor. */
	@JsonProperty("notifyAddedAsCompetitor")
	public boolean notifyAddedAsCompetitor;

	/** The subscription. */
	@JsonProperty("subscription")
	public boolean subscription;

	/** The created on. */
	@JsonProperty("createdOn")
	public Date createdOn;

	/** The modified on. */
	@JsonProperty("modifiedOn")
	public Date modifiedOn;

	/**
	 * Instantiates a new business user.
	 *
	 * @param username
	 *            the username
	 * @param password
	 *            the password
	 * @param enabled
	 *            the enabled
	 * @param accountNonExpired
	 *            the account non expired
	 * @param credentialsNonExpired
	 *            the credentials non expired
	 * @param accountNonLocked
	 *            the account non locked
	 * @param authorities
	 *            the authorities
	 */
	public BusinessUser(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		this.createdOn = new Date();
		this.modifiedOn = this.createdOn;
		this.subscription = false;
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
	 * Gets the client business url.
	 *
	 * @return the client business url
	 */
	public String getClientBusinessUrl() {
		return clientBusinessUrl;
	}

	/**
	 * Sets the client business url.
	 *
	 * @param clientBusinessUrl
	 *            the new client business url
	 */
	public void setClientBusinessUrl(String clientBusinessUrl) {
		this.clientBusinessUrl = clientBusinessUrl;
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

	/**
	 * Gets the facebook url.
	 *
	 * @return the facebook url
	 */
	public String getFacebookUrl() {
		return facebookUrl;
	}

	/**
	 * Sets the facebook url.
	 *
	 * @param facebookUrl
	 *            the new facebook url
	 */
	public void setFacebookUrl(String facebookUrl) {
		this.facebookUrl = facebookUrl;
	}

	/**
	 * Gets the yelp url.
	 *
	 * @return the yelp url
	 */
	public String getYelpUrl() {
		return yelpUrl;
	}

	/**
	 * Sets the yelp url.
	 *
	 * @param yelpUrl
	 *            the new yelp url
	 */
	public void setYelpUrl(String yelpUrl) {
		this.yelpUrl = yelpUrl;
	}

	/**
	 * Checks if is notify new review.
	 *
	 * @return true, if is notify new review
	 */
	public boolean isNotifyNewReview() {
		return notifyNewReview;
	}

	/**
	 * Sets the notify new review.
	 *
	 * @param notifyNewReview
	 *            the new notify new review
	 */
	public void setNotifyNewReview(boolean notifyNewReview) {
		this.notifyNewReview = notifyNewReview;
	}

	/**
	 * Checks if is notify new report.
	 *
	 * @return true, if is notify new report
	 */
	public boolean isNotifyNewReport() {
		return notifyNewReport;
	}

	/**
	 * Sets the notify new report.
	 *
	 * @param notifyNewReport
	 *            the new notify new report
	 */
	public void setNotifyNewReport(boolean notifyNewReport) {
		this.notifyNewReport = notifyNewReport;
	}

	/**
	 * Gets the subscription.
	 *
	 * @return the subscription
	 */
	public boolean getSubscription() {
		return subscription;
	}

	/**
	 * Sets the subscription.
	 *
	 * @param subscription
	 *            the new subscription
	 */
	public void setSubscription(boolean subscription) {
		this.subscription = subscription;
	}

	/**
	 * Gets the serialversionuid.
	 *
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/**
	 * Gets the review manager user map.
	 *
	 * @return the review manager user map
	 */
	public Map<String, Object> getReviewManagerUserMap() {
		return RMUtil.getMap(this);
	}

	/**
	 * Checks if is notify added as competitor.
	 *
	 * @return true, if is notify added as competitor
	 */
	public boolean isNotifyAddedAsCompetitor() {
		return notifyAddedAsCompetitor;
	}

	/**
	 * Sets the notify added as competitor.
	 *
	 * @param notifyAddedAsCompetitor
	 *            the new notify added as competitor
	 */
	public void setNotifyAddedAsCompetitor(boolean notifyAddedAsCompetitor) {
		this.notifyAddedAsCompetitor = notifyAddedAsCompetitor;
	}

	/**
	 * Gets the created on.
	 *
	 * @return the created on
	 */
	public Date getCreatedOn() {
		return createdOn;
	}

	/**
	 * Gets the modified on.
	 *
	 * @return the modified on
	 */
	public Date getModifiedOn() {
		return modifiedOn;
	}

	/**
	 * Sets the modified on.
	 *
	 * @param modifiedOn
	 *            the new modified on
	 */
	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
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
	 * Gets the working hours.
	 *
	 * @return the working hours
	 */
	public WorkingHours getWorkingHours() {
		return workingHours;
	}

	/**
	 * Sets the working hours.
	 *
	 * @param workingHours
	 *            the new working hours
	 */
	public void setWorkingHours(WorkingHours workingHours) {
		this.workingHours = workingHours;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.security.core.userdetails.User#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((clientBusinessPhoneNumber == null) ? 0 : clientBusinessPhoneNumber.hashCode());
		result = prime * result + ((clientBusinessUrl == null) ? 0 : clientBusinessUrl.hashCode());
		result = prime * result + ((clientEmail == null) ? 0 : clientEmail.hashCode());
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((clientName == null) ? 0 : clientName.hashCode());
		result = prime * result + ((clientType == null) ? 0 : clientType.hashCode());
		result = prime * result + ((createdOn == null) ? 0 : createdOn.hashCode());
		result = prime * result + ((facebookUrl == null) ? 0 : facebookUrl.hashCode());
		result = prime * result + ((modifiedOn == null) ? 0 : modifiedOn.hashCode());
		result = prime * result + (notifyAddedAsCompetitor ? 1231 : 1237);
		result = prime * result + (notifyNewReport ? 1231 : 1237);
		result = prime * result + (notifyNewReview ? 1231 : 1237);
		result = prime * result + (subscription ? 1231 : 1237);
		result = prime * result + ((workingHours == null) ? 0 : workingHours.hashCode());
		result = prime * result + ((yelpUrl == null) ? 0 : yelpUrl.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.security.core.userdetails.User#equals(java.lang.
	 * Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		BusinessUser other = (BusinessUser) obj;
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
		if (clientBusinessUrl == null) {
			if (other.clientBusinessUrl != null)
				return false;
		} else if (!clientBusinessUrl.equals(other.clientBusinessUrl))
			return false;
		if (clientEmail == null) {
			if (other.clientEmail != null)
				return false;
		} else if (!clientEmail.equals(other.clientEmail))
			return false;
		if (clientId == null) {
			if (other.clientId != null)
				return false;
		} else if (!clientId.equals(other.clientId))
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
		if (createdOn == null) {
			if (other.createdOn != null)
				return false;
		} else if (!createdOn.equals(other.createdOn))
			return false;
		if (facebookUrl == null) {
			if (other.facebookUrl != null)
				return false;
		} else if (!facebookUrl.equals(other.facebookUrl))
			return false;
		if (modifiedOn == null) {
			if (other.modifiedOn != null)
				return false;
		} else if (!modifiedOn.equals(other.modifiedOn))
			return false;
		if (notifyAddedAsCompetitor != other.notifyAddedAsCompetitor)
			return false;
		if (notifyNewReport != other.notifyNewReport)
			return false;
		if (notifyNewReview != other.notifyNewReview)
			return false;
		if (subscription != other.subscription)
			return false;
		if (workingHours == null) {
			if (other.workingHours != null)
				return false;
		} else if (!workingHours.equals(other.workingHours))
			return false;
		if (yelpUrl == null) {
			if (other.yelpUrl != null)
				return false;
		} else if (!yelpUrl.equals(other.yelpUrl))
			return false;
		return true;
	}

}
