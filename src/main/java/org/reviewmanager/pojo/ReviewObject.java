package org.reviewmanager.pojo;

import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
public class ReviewObject {
	
	@JsonProperty(value="clientName")
	public String clientName;
	
	@JsonProperty(value="clientUserName")
	public String clientUserName;
	
	@JsonProperty(value="postedBy")
	public String postedBy;
	
	@JsonProperty(value="postedEmail")
	public String postedEmail;
	
	@JsonProperty(value="postedDetail")
	public String postedDetail;
	
	@JsonProperty(value="postedDate")
	public String postedDate;
	
	@JsonProperty(value="postedType")
	public String postedType;
	
	@JsonProperty(value="totalStars")
	public Double totalStars;
	
	@JsonProperty(value="reviewContent")
	public String reviewContent;
	
	@JsonProperty(value="positiveReview")
	public boolean positiveReview;
	
	@JsonProperty(value="neutralReview")
	public boolean neutralReview;
	
	@JsonProperty(value="negativeReview")
	public boolean negativeReview;
	
	public String reviewId;
	
	public ReviewObject() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ReviewObject(String clientName,String postedEmail,String streetName,String city,String zipCode,String province,String country,String rating,String postedDate,String reviewContent){
		super();
		this.clientName = clientName;
		this.clientUserName = clientName;
		this.postedEmail = postedEmail;
		this.postedDetail = streetName+" "+city+" "+zipCode+" "+province+" "+country;
		this.totalStars = Double.parseDouble(rating);
		this.postedDate = postedDate;
		this.reviewContent = reviewContent;
	}
	
	public ReviewObject(String clientName, String postedBy, String postedDate, Double totalStars,
			String reviewContent,String clientUserName) {
		super();
		this.clientName = clientName;
		this.clientUserName = clientUserName;
		this.postedBy = postedBy;
		this.postedDate = postedDate;
		this.totalStars = totalStars;
		this.reviewContent = reviewContent;
	}

	public String getPostedBy() {
		return postedBy;
	}

	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
	}

	public String getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(String postedDate) {
		this.postedDate = postedDate;
	}

	public Double getTotalStars() {
		return totalStars;
	}

	public void setTotalStars(Double totalStars) {
		this.totalStars = totalStars;
	}

	public String getReviewContent() {
		return reviewContent;
	}

	public void setReviewContent(String reviewContent) {
		this.reviewContent = reviewContent;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	

	public String getReviewId() {
		return reviewId;
	}

	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}

	public String getClientUserName() {
		return clientUserName;
	}

	public void setClientUserName(String clientUserName) {
		this.clientUserName = clientUserName;
	}

	public String getPostedEmail() {
		return postedEmail;
	}

	public void setPostedEmail(String postedEmail) {
		this.postedEmail = postedEmail;
	}

	public String getPostedDetail() {
		return postedDetail;
	}

	public void setPostedDetail(String postedDetail) {
		this.postedDetail = postedDetail;
	}

	public String getPostedType() {
		return postedType;
	}

	public void setPostedType(String postedType) {
		this.postedType = postedType;
	}

	public boolean isPositiveReview() {
		return this.totalStars > ReviewManagerConstants.POSITIVE_REVIEW_THRESHOLD;
	}

	public void setPositiveReview(boolean positiveReview) {
		this.positiveReview = positiveReview;
	}
	
	public boolean isNeutralReview() {
		return this.totalStars - ReviewManagerConstants.POSITIVE_REVIEW_THRESHOLD == 0;
	}

	public void setNeutralReview(boolean neutralReview) {
		this.neutralReview = neutralReview;
	}
	
	public boolean isNegativeReview() {
		return this.totalStars < ReviewManagerConstants.POSITIVE_REVIEW_THRESHOLD;
	}

	public void setNegativeReview(boolean negativeReview) {
		this.negativeReview = negativeReview;
	}

	public Map<String,Object> getReviewObjectMap(){
		return RMUtil.getMap(this);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clientName == null) ? 0 : clientName.hashCode());
		result = prime * result + ((clientUserName == null) ? 0 : clientUserName.hashCode());
		result = prime * result + (negativeReview ? 1231 : 1237);
		result = prime * result + (neutralReview ? 1231 : 1237);
		result = prime * result + (positiveReview ? 1231 : 1237);
		result = prime * result + ((postedBy == null) ? 0 : postedBy.hashCode());
		result = prime * result + ((postedDate == null) ? 0 : postedDate.hashCode());
		result = prime * result + ((postedDetail == null) ? 0 : postedDetail.hashCode());
		result = prime * result + ((postedEmail == null) ? 0 : postedEmail.hashCode());
		result = prime * result + ((postedType == null) ? 0 : postedType.hashCode());
		result = prime * result + ((reviewContent == null) ? 0 : reviewContent.hashCode());
		result = prime * result + ((reviewId == null) ? 0 : reviewId.hashCode());
		result = prime * result + ((totalStars == null) ? 0 : totalStars.hashCode());
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
		ReviewObject other = (ReviewObject) obj;
		if (clientName == null) {
			if (other.clientName != null)
				return false;
		} else if (!clientName.equals(other.clientName))
			return false;
		if (clientUserName == null) {
			if (other.clientUserName != null)
				return false;
		} else if (!clientUserName.equals(other.clientUserName))
			return false;
		if (negativeReview != other.negativeReview)
			return false;
		if (neutralReview != other.neutralReview)
			return false;
		if (positiveReview != other.positiveReview)
			return false;
		if (postedBy == null) {
			if (other.postedBy != null)
				return false;
		} else if (!postedBy.equals(other.postedBy))
			return false;
		if (postedDate == null) {
			if (other.postedDate != null)
				return false;
		} else if (!postedDate.equals(other.postedDate))
			return false;
		if (postedDetail == null) {
			if (other.postedDetail != null)
				return false;
		} else if (!postedDetail.equals(other.postedDetail))
			return false;
		if (postedEmail == null) {
			if (other.postedEmail != null)
				return false;
		} else if (!postedEmail.equals(other.postedEmail))
			return false;
		if (postedType == null) {
			if (other.postedType != null)
				return false;
		} else if (!postedType.equals(other.postedType))
			return false;
		if (reviewContent == null) {
			if (other.reviewContent != null)
				return false;
		} else if (!reviewContent.equals(other.reviewContent))
			return false;
		if (reviewId == null) {
			if (other.reviewId != null)
				return false;
		} else if (!reviewId.equals(other.reviewId))
			return false;
		if (totalStars == null) {
			if (other.totalStars != null)
				return false;
		} else if (!totalStars.equals(other.totalStars))
			return false;
		return true;
	}


	

	

	
}
