package org.reviewmanager.pojo;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({"password","accountNonExpired","accountNonLocked","credentialsNonExpired","enabled"})
@JsonAutoDetect(fieldVisibility=Visibility.NONE,getterVisibility=Visibility.ANY)
public class ReviewManagerUser extends User {

	private static final long serialVersionUID = 1L;
	
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
	public boolean subscription;
	
	@JsonProperty("createdOn")
	public Date createdOn;
	
	@JsonProperty("modifiedOn")
	public Date modifiedOn;
	
	public ReviewManagerUser(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		this.createdOn = new Date();
		this.modifiedOn = this.createdOn;
		this.subscription = false;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
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
	
	public String getClientBusinessUrl() {
		return clientBusinessUrl;
	}

	public void setClientBusinessUrl(String clientBusinessUrl) {
		this.clientBusinessUrl = clientBusinessUrl;
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

	public boolean getSubscription() {
		return subscription;
	}

	public void setSubscription(boolean subscription) {
		this.subscription = subscription;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public Map<String,Object> getReviewManagerUserMap(){
		return RMUtil.getMap(this);
	}
	
	

	public boolean isNotifyAddedAsCompetitor() {
		return notifyAddedAsCompetitor;
	}

	public void setNotifyAddedAsCompetitor(boolean notifyAddedAsCompetitor) {
		this.notifyAddedAsCompetitor = notifyAddedAsCompetitor;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public Date getModifiedOn() {
		return modifiedOn;
	}

	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((address == null) ? 0 : address.hashCode());
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
		result = prime * result + ((yelpUrl == null) ? 0 : yelpUrl.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		ReviewManagerUser other = (ReviewManagerUser) obj;
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
		if (yelpUrl == null) {
			if (other.yelpUrl != null)
				return false;
		} else if (!yelpUrl.equals(other.yelpUrl))
			return false;
		return true;
	}

	


	

	
	

}
