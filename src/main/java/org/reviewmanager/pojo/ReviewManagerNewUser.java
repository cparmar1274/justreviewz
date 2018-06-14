package org.reviewmanager.pojo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonAutoDetect(fieldVisibility=Visibility.ANY)
public class ReviewManagerNewUser {

	@JsonProperty("username")
	public String username;
	
	@JsonProperty("password")
	public String password;
	
	@JsonProperty("clientName")
	public String clientName;
	
	@JsonProperty("clientType")
	public String clientType;
	
	@JsonProperty("clientId")
	public String clientId;
	
	@JsonProperty("clientEmail")
	public String clientEmail;
	
	@JsonProperty("clientBusinessUrl")
	public String clientBusinessUrl;
	
	@JsonProperty("address")
	public Address address;
	
	@JsonProperty("facebookUrl")
	public String facebookUrl;
	
	@JsonProperty("yelpUrl")
	public String yelpUrl;
	
	@JsonProperty("notifyNewReview")
	public boolean notifyNewReview;
	
	@JsonProperty("notifyNewReport")
	public boolean notifyNewReport;
	
	@JsonProperty("notifyAddedAsCompetitor")
	public boolean notifyAddedAsCompetitor;
	
	@JsonProperty("subscription")
	public Subscription subscription;
	
	public ReviewManagerNewUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getClientType() {
		return clientType;
	}

	public void setClientType(String clientType) {
		this.clientType = clientType;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getClientEmail() {
		return clientEmail;
	}

	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getFacebookUrl() {
		return facebookUrl;
	}

	public void setFacebookUrl(String facebookUrl) {
		this.facebookUrl = facebookUrl;
	}

	public String getYelpUrl() {
		return yelpUrl;
	}

	public void setYelpUrl(String yelpUrl) {
		this.yelpUrl = yelpUrl;
	}

	public boolean isNotifyNewReview() {
		return notifyNewReview;
	}

	public void setNotifyNewReview(boolean notifyNewReview) {
		this.notifyNewReview = notifyNewReview;
	}

	public boolean isNotifyNewReport() {
		return notifyNewReport;
	}

	public void setNotifyNewReport(boolean notifyNewReport) {
		this.notifyNewReport = notifyNewReport;
	}

	public Subscription getSubscription() {
		return subscription;
	}

	public void setSubscription(Subscription subscription) {
		this.subscription = subscription;
	}

	

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isNotifyAddedAsCompetitor() {
		return notifyAddedAsCompetitor;
	}

	public void setNotifyAddedAsCompetitor(boolean notifyAddedAsCompetitor) {
		this.notifyAddedAsCompetitor = notifyAddedAsCompetitor;
	}

	
	
	public String getClientBusinessUrl() {
		return clientBusinessUrl;
	}

	public void setClientBusinessUrl(String clientBusinessUrl) {
		this.clientBusinessUrl = clientBusinessUrl;
	}

	
	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
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
		result = prime * result + ((yelpUrl == null) ? 0 : yelpUrl.hashCode());
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
		ReviewManagerNewUser other = (ReviewManagerNewUser) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
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
		if (yelpUrl == null) {
			if (other.yelpUrl != null)
				return false;
		} else if (!yelpUrl.equals(other.yelpUrl))
			return false;
		return true;
	}

	public ReviewManagerUser getUser() {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("USER")); 
		String password = new BCryptPasswordEncoder().encode(this.getPassword());
		ReviewManagerUser user = new ReviewManagerUser(this.getUsername(),password, true, true, true, true, authorities);
		user.setAddress(this.getAddress());
		user.setSubscription(false);
		user.setClientId(this.getClientId());
		user.setClientEmail(this.getClientEmail());
		user.setClientName(this.getClientName());
		user.setClientType(this.getClientType());
		user.setNotifyAddedAsCompetitor(this.isNotifyAddedAsCompetitor());
		user.setNotifyNewReport(this.isNotifyNewReport());
		user.setNotifyNewReview(this.isNotifyNewReview());
		user.setClientBusinessUrl(this.getClientBusinessUrl()==null ? "": this.getClientBusinessUrl());
		user.setYelpUrl(this.getYelpUrl()==null ? "" : this.getYelpUrl());
		user.setFacebookUrl(this.getFacebookUrl()==null ? "" : this.getFacebookUrl());
		return user;
	}
	

}
