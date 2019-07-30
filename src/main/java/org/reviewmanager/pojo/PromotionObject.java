package org.reviewmanager.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class PromotionObject.
 */
@JsonIgnoreProperties(ignoreUnknown = true, allowGetters = false, allowSetters = false)
public class PromotionObject {

	/** The promotion id. */
	@JsonProperty("promotionId")
	public String promotionId;

	/** The client id. */
	@JsonProperty("clientId")
	public String clientId;

	/** The promotion title. */
	@JsonProperty("promotionTitle")
	public String promotionTitle;

	/** The promotion detail. */
	@JsonProperty("promotionDetail")
	public String promotionDetail;

	/** The promotion start date. */
	@JsonProperty("promotionStartDate")
	public String promotionStartDate;

	/** The promotion end date. */
	@JsonProperty("promotionEndDate")
	public String promotionEndDate;

	@JsonProperty("businessName")
	public String businessName;

	@JsonProperty("businessAddress")
	public String businessAddress;

	/**
	 * Instantiates a new promotion object.
	 */
	public PromotionObject() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * Instantiates a new promotion object.
	 *
	 * @param promotionId
	 *            the promotion id
	 * @param clientId
	 *            the client id
	 * @param promotionTitle
	 *            the promotion title
	 * @param promotionDetail
	 *            the promotion detail
	 * @param promotionStartDate
	 *            the promotion start date
	 * @param promotionEndDate
	 *            the promotion end date
	 */
	public PromotionObject(String promotionId, String clientId, String promotionTitle, String promotionDetail,
			String promotionStartDate, String promotionEndDate, String businessName, String businessAddress) {
		super();
		this.promotionId = promotionId;
		this.clientId = clientId;
		this.promotionTitle = promotionTitle;
		this.promotionDetail = promotionDetail;
		this.promotionStartDate = promotionStartDate;
		this.promotionEndDate = promotionEndDate;
		this.businessName = businessName;
		this.businessAddress = businessAddress;
	}

	/**
	 * Gets the promotion id.
	 *
	 * @return the promotion id
	 */
	public String getPromotionId() {
		return promotionId;
	}

	/**
	 * Sets the promotion id.
	 *
	 * @param promotionId
	 *            the new promotion id
	 */
	public void setPromotionId(String promotionId) {
		this.promotionId = promotionId;
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
	 * Gets the promotion title.
	 *
	 * @return the promotion title
	 */
	public String getPromotionTitle() {
		return promotionTitle;
	}

	/**
	 * Sets the promotion title.
	 *
	 * @param promotionTitle
	 *            the new promotion title
	 */
	public void setPromotionTitle(String promotionTitle) {
		this.promotionTitle = promotionTitle;
	}

	/**
	 * Gets the promotion detail.
	 *
	 * @return the promotion detail
	 */
	public String getPromotionDetail() {
		return promotionDetail;
	}

	/**
	 * Sets the promotion detail.
	 *
	 * @param promotionDetail
	 *            the new promotion detail
	 */
	public void setPromotionDetail(String promotionDetail) {
		this.promotionDetail = promotionDetail;
	}

	/**
	 * Gets the promotion start date.
	 *
	 * @return the promotion start date
	 */
	public String getPromotionStartDate() {
		return promotionStartDate;
	}

	/**
	 * Sets the promotion start date.
	 *
	 * @param promotionStartDate
	 *            the new promotion start date
	 */
	public void setPromotionStartDate(String promotionStartDate) {
		this.promotionStartDate = promotionStartDate;
	}

	/**
	 * Gets the promotion end date.
	 *
	 * @return the promotion end date
	 */
	public String getPromotionEndDate() {
		return promotionEndDate;
	}

	/**
	 * Sets the promotion end date.
	 *
	 * @param promotionEndDate
	 *            the new promotion end date
	 */
	public void setPromotionEndDate(String promotionEndDate) {
		this.promotionEndDate = promotionEndDate;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getBusinessAddress() {
		return businessAddress;
	}

	public void setBusinessAddress(String businessAddress) {
		this.businessAddress = businessAddress;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((businessAddress == null) ? 0 : businessAddress.hashCode());
		result = prime * result + ((businessName == null) ? 0 : businessName.hashCode());
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((promotionDetail == null) ? 0 : promotionDetail.hashCode());
		result = prime * result + ((promotionEndDate == null) ? 0 : promotionEndDate.hashCode());
		result = prime * result + ((promotionId == null) ? 0 : promotionId.hashCode());
		result = prime * result + ((promotionStartDate == null) ? 0 : promotionStartDate.hashCode());
		result = prime * result + ((promotionTitle == null) ? 0 : promotionTitle.hashCode());
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
		PromotionObject other = (PromotionObject) obj;
		if (businessAddress == null) {
			if (other.businessAddress != null)
				return false;
		} else if (!businessAddress.equals(other.businessAddress))
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
		if (promotionDetail == null) {
			if (other.promotionDetail != null)
				return false;
		} else if (!promotionDetail.equals(other.promotionDetail))
			return false;
		if (promotionEndDate == null) {
			if (other.promotionEndDate != null)
				return false;
		} else if (!promotionEndDate.equals(other.promotionEndDate))
			return false;
		if (promotionId == null) {
			if (other.promotionId != null)
				return false;
		} else if (!promotionId.equals(other.promotionId))
			return false;
		if (promotionStartDate == null) {
			if (other.promotionStartDate != null)
				return false;
		} else if (!promotionStartDate.equals(other.promotionStartDate))
			return false;
		if (promotionTitle == null) {
			if (other.promotionTitle != null)
				return false;
		} else if (!promotionTitle.equals(other.promotionTitle))
			return false;
		return true;
	}

}
