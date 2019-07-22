package org.reviewmanager.pojo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class PromotionCounterObject.
 */
@JsonIgnoreProperties(ignoreUnknown = true, allowGetters = false, allowSetters = false)
public class PromotionCounterObject {

	/** The client id. */
	@JsonProperty("clientId")
	public String clientId;
	
	/** The promotion request counter. */
	@JsonProperty("promotionRequestCounter")
	public Integer promotionRequestCounter;
	
	/** The update time. */
	public Date updateTime;
	
	/**
	 * Instantiates a new promotion counter object.
	 */
	public PromotionCounterObject() {
		super();
		this.promotionRequestCounter = 0;
		this.updateTime = new Date();
	}
	
	/**
	 * Instantiates a new promotion counter object.
	 *
	 * @param clientId the client id
	 * @param promotionRequestCounter the promotion request counter
	 */
	public PromotionCounterObject(String clientId, Integer promotionRequestCounter) {
		super();
		this.clientId = clientId;
		this.promotionRequestCounter = promotionRequestCounter;
		this.updateTime = new Date();
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
	 * Gets the promotion request counter.
	 *
	 * @return the promotion request counter
	 */
	public Integer getPromotionRequestCounter() {
		return promotionRequestCounter;
	}
	
	/**
	 * Sets the promotion request counter.
	 *
	 * @param promotionRequestCounter the new promotion request counter
	 */
	public void setPromotionRequestCounter(Integer promotionRequestCounter) {
		this.promotionRequestCounter = promotionRequestCounter;
	}
	
	/**
	 * Incr promotion request counter.
	 */
	public void incrPromotionRequestCounter() {
		this.promotionRequestCounter++;
		this.updateTime = new Date();
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((promotionRequestCounter == null) ? 0 : promotionRequestCounter.hashCode());
		result = prime * result + ((updateTime == null) ? 0 : updateTime.hashCode());
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
		PromotionCounterObject other = (PromotionCounterObject) obj;
		if (clientId == null) {
			if (other.clientId != null)
				return false;
		} else if (!clientId.equals(other.clientId))
			return false;
		if (promotionRequestCounter == null) {
			if (other.promotionRequestCounter != null)
				return false;
		} else if (!promotionRequestCounter.equals(other.promotionRequestCounter))
			return false;
		if (updateTime == null) {
			if (other.updateTime != null)
				return false;
		} else if (!updateTime.equals(other.updateTime))
			return false;
		return true;
	}
	
	
	
}
