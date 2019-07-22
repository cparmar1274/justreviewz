package org.reviewmanager.users;

import java.util.ArrayList;
import java.util.List;

import org.reviewmanager.pojo.Address;
import org.reviewmanager.pojo.Subscription;
import org.reviewmanager.pojo.WorkingHours;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class BusinessUserTemp.
 */
@JsonIgnoreProperties(ignoreUnknown = true,allowGetters=false,allowSetters=false)
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class BusinessUserTemp {

	/** The username. */
	@JsonProperty("username")
	public String username;

	/** The password. */
	@JsonProperty("password")
	public String password;

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
	public Subscription subscription;
	
	/**
	 * Instantiates a new business user temp.
	 */
	public BusinessUserTemp() {
		super();
		this.notifyAddedAsCompetitor = false;
		this.notifyNewReport = false;
		this.notifyAddedAsCompetitor = false;
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
	 * @param clientName the new client name
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
	 * @param clientType the new client type
	 */
	public void setClientType(String clientType) {
		this.clientType = clientType;
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
	 * @param clientEmail the new client email
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
	 * @param address the new address
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
	 * @param facebookUrl the new facebook url
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
	 * @param yelpUrl the new yelp url
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
	 * @param notifyNewReview the new notify new review
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
	 * @param notifyNewReport the new notify new report
	 */
	public void setNotifyNewReport(boolean notifyNewReport) {
		this.notifyNewReport = notifyNewReport;
	}

	/**
	 * Gets the subscription.
	 *
	 * @return the subscription
	 */
	public Subscription getSubscription() {
		return subscription;
	}

	/**
	 * Sets the subscription.
	 *
	 * @param subscription the new subscription
	 */
	public void setSubscription(Subscription subscription) {
		this.subscription = subscription;
	}

	/**
	 * Gets the username.
	 *
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Sets the username.
	 *
	 * @param username the new username
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Gets the password.
	 *
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Sets the password.
	 *
	 * @param password the new password
	 */
	public void setPassword(String password) {
		this.password = password;
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
	 * @param notifyAddedAsCompetitor the new notify added as competitor
	 */
	public void setNotifyAddedAsCompetitor(boolean notifyAddedAsCompetitor) {
		this.notifyAddedAsCompetitor = notifyAddedAsCompetitor;
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
	 * @param clientBusinessUrl the new client business url
	 */
	public void setClientBusinessUrl(String clientBusinessUrl) {
		this.clientBusinessUrl = clientBusinessUrl;
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
	 * @param clientBusinessPhoneNumber the new client business phone number
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
	 * @param workingHours the new working hours
	 */
	public void setWorkingHours(WorkingHours workingHours) {
		this.workingHours = workingHours;
	}



	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((clientBusinessPhoneNumber == null) ? 0 : clientBusinessPhoneNumber.hashCode());
		result = prime * result + ((clientBusinessUrl == null) ? 0 : clientBusinessUrl.hashCode());
		result = prime * result + ((clientEmail == null) ? 0 : clientEmail.hashCode());
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((clientName == null) ? 0 : clientName.hashCode());
		result = prime * result + ((clientType == null) ? 0 : clientType.hashCode());
		result = prime * result + ((facebookUrl == null) ? 0 : facebookUrl.hashCode());
		result = prime * result + (notifyAddedAsCompetitor ? 1231 : 1237);
		result = prime * result + (notifyNewReport ? 1231 : 1237);
		result = prime * result + (notifyNewReview ? 1231 : 1237);
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((subscription == null) ? 0 : subscription.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		result = prime * result + ((workingHours == null) ? 0 : workingHours.hashCode());
		result = prime * result + ((yelpUrl == null) ? 0 : yelpUrl.hashCode());
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
		BusinessUserTemp other = (BusinessUserTemp) obj;
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
		if (facebookUrl == null) {
			if (other.facebookUrl != null)
				return false;
		} else if (!facebookUrl.equals(other.facebookUrl))
			return false;
		if (notifyAddedAsCompetitor != other.notifyAddedAsCompetitor)
			return false;
		if (notifyNewReport != other.notifyNewReport)
			return false;
		if (notifyNewReview != other.notifyNewReview)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (subscription == null) {
			if (other.subscription != null)
				return false;
		} else if (!subscription.equals(other.subscription))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
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
	
	

	/**
	 * Gets the user.
	 *
	 * @return the user
	 */
	public BusinessUser getUser() {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("USER"));
		String password = new BCryptPasswordEncoder().encode(this.getPassword());
		BusinessUser user = new BusinessUser(this.getUsername(), password, true, true, true, true, authorities);

		// must have values
		user.setAddress(this.getAddress());
		user.setClientId(this.getClientId());
		user.setClientName(this.getClientName());
		user.setClientType(this.getClientType());
		user.setClientEmail(this.getClientEmail());

		// optional
		user.setWorkingHours(this.getWorkingHours());
		user.setClientBusinessPhoneNumber(this.getClientBusinessPhoneNumber());
		user.setSubscription(false);
		user.setNotifyAddedAsCompetitor(this.isNotifyAddedAsCompetitor());
		user.setNotifyNewReport(this.isNotifyNewReport());
		user.setNotifyNewReview(this.isNotifyNewReview());
		user.setClientBusinessUrl(this.getClientBusinessUrl() == null ? "" : this.getClientBusinessUrl());
		user.setYelpUrl(this.getYelpUrl() == null ? "" : this.getYelpUrl());
		user.setFacebookUrl(this.getFacebookUrl() == null ? "" : this.getFacebookUrl());
		return user;
	}

}
