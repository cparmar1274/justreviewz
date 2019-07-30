package org.reviewmanager.pojo;

import java.util.Date;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class ReviewObject.
 */
@JsonIgnoreProperties(ignoreUnknown = true, allowGetters = true, allowSetters = true)
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.ANY)
public class ReviewObject {

	/** The review id. */
	@JsonProperty(value = "reviewId")
	public String reviewId;

	// details of business user about which review has been posted by public
	/** The client id. */
	// user
	@JsonProperty(value = "clientId")
	public String clientId;

	/** The public id. */
	@JsonProperty(value = "publicId")
	public String publicId;

	/** The posted by. */
	@JsonProperty(value = "postedBy")
	public String postedBy;

	/** The posted email. */
	@JsonProperty(value = "postedEmail")
	public String postedEmail;

	/** The review date. */
	@JsonProperty(value = "reviewDate")
	public Date reviewDate;

	/** The posted type. */
	@JsonProperty(value = "postedType")
	public String postedType;

	/** The review rating. */
	@JsonProperty(value = "reviewRating")
	public Double reviewRating;

	/** The review text. */
	@JsonProperty(value = "reviewText")
	public String reviewText;

	@JsonProperty(value = "type")
	public String type;

	/** The positive review. */
	@JsonProperty(value = "positiveReview")
	public boolean positiveReview;

	/** The neutral review. */
	@JsonProperty(value = "neutralReview")
	public boolean neutralReview;

	/** The negative review. */
	@JsonProperty(value = "negativeReview")
	public boolean negativeReview;

	/** The reply to. */
	@JsonProperty(value = "replyText")
	public String replyText;

	@JsonProperty(value = "replyDate")
	public Date replyDate;

	@JsonProperty("businessName")
	public String businessName;

	@JsonProperty("businessAddress")
	public String businessAddress;

	/** The like. */
	@JsonProperty(value = "like")
	public Integer like;

	/** The dislike. */
	@JsonProperty(value = "dislike")
	public Integer dislike;

	/**
	 * Instantiates a new review object.
	 */
	public ReviewObject() {
		super();
		this.like = 0;
		this.dislike = 0;
		this.reviewDate = new Date();
	}

	/**
	 * Instantiates a new review object.
	 *
	 * @param clientId
	 *            the client id
	 * @param postedEmail
	 *            the posted email
	 * @param streetName
	 *            the street name
	 * @param city
	 *            the city
	 * @param zipCode
	 *            the zip code
	 * @param province
	 *            the province
	 * @param country
	 *            the country
	 * @param rating
	 *            the rating
	 * @param reviewContent
	 *            the review content
	 */
	public ReviewObject(String clientId, String postedEmail, String rating, String reviewContent, String businessName,
			String businessAddress) {
		super();
		this.clientId = clientId;
		this.postedEmail = postedEmail;
		this.reviewRating = Double.parseDouble(rating);
		this.reviewDate = new Date();
		this.reviewText = reviewContent;
		this.businessName = businessName;
		this.businessAddress = businessAddress;
	}

	/**
	 * Gets the posted by.
	 *
	 * @return the posted by
	 */
	public String getPostedBy() {
		return postedBy;
	}

	/**
	 * Sets the posted by.
	 *
	 * @param postedBy
	 *            the new posted by
	 */
	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/**
	 * Gets the review date.
	 *
	 * @return the review date
	 */
	public Date getReviewDate() {
		return reviewDate;
	}

	/**
	 * Gets the review rating.
	 *
	 * @return the review rating
	 */
	public Double getReviewRating() {
		return reviewRating;
	}

	/**
	 * Sets the review rating.
	 *
	 * @param reviewRating
	 *            the new review rating
	 */
	public void setReviewRating(Double reviewRating) {
		this.reviewRating = reviewRating;
	}

	/**
	 * Gets the review text.
	 *
	 * @return the review text
	 */
	public String getReviewText() {
		return reviewText;
	}

	/**
	 * Sets the review text.
	 *
	 * @param reviewText
	 *            the new review text
	 */
	public void setReviewText(String reviewText) {
		this.reviewText = reviewText.trim();
	}

	/**
	 * Gets the review id.
	 *
	 * @return the review id
	 */
	public String getReviewId() {
		return reviewId;
	}

	/**
	 * Sets the review id.
	 *
	 * @param reviewId
	 *            the new review id
	 */
	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}

	/**
	 * Gets the posted email.
	 *
	 * @return the posted email
	 */
	public String getPostedEmail() {
		return postedEmail;
	}

	/**
	 * Sets the posted email.
	 *
	 * @param postedEmail
	 *            the new posted email
	 */
	public void setPostedEmail(String postedEmail) {
		this.postedEmail = postedEmail;
	}

	/**
	 * Gets the posted type.
	 *
	 * @return the posted type
	 */
	public String getPostedType() {
		return postedType;
	}

	/**
	 * Sets the posted type.
	 *
	 * @param postedType
	 *            the new posted type
	 */
	public void setPostedType(String postedType) {
		this.postedType = postedType;
	}

	/**
	 * Checks if is positive review.
	 *
	 * @return true, if is positive review
	 */
	public boolean isPositiveReview() {
		return this.reviewRating > RMUtil.POSITIVE_REVIEW_THRESHOLD;
	}

	/**
	 * Sets the review date.
	 *
	 * @param reviewDate
	 *            the new review date
	 */
	public void setReviewDate(Date reviewDate) {
		this.reviewDate = reviewDate;
	}

	/**
	 * Sets the positive review.
	 *
	 * @param positiveReview
	 *            the new positive review
	 */
	public void setPositiveReview(boolean positiveReview) {
		this.positiveReview = positiveReview;
	}

	/**
	 * Checks if is neutral review.
	 *
	 * @return true, if is neutral review
	 */
	public boolean isNeutralReview() {
		return this.reviewRating - RMUtil.POSITIVE_REVIEW_THRESHOLD == 0;
	}

	/**
	 * Sets the neutral review.
	 *
	 * @param neutralReview
	 *            the new neutral review
	 */
	public void setNeutralReview(boolean neutralReview) {
		this.neutralReview = neutralReview;
	}

	/**
	 * Checks if is negative review.
	 *
	 * @return true, if is negative review
	 */
	public boolean isNegativeReview() {
		return this.reviewRating < RMUtil.POSITIVE_REVIEW_THRESHOLD;
	}

	/**
	 * Sets the negative review.
	 *
	 * @param negativeReview
	 *            the new negative review
	 */
	public void setNegativeReview(boolean negativeReview) {
		this.negativeReview = negativeReview;
	}

	/**
	 * Gets the review object map.
	 *
	 * @return the review object map
	 */
	public Map<String, Object> getReviewObjectMap() {
		return RMUtil.getMap(this);
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
	 * Gets the public id.
	 *
	 * @return the public id
	 */
	public String getPublicId() {
		return publicId;
	}

	/**
	 * Sets the public id.
	 *
	 * @param publicId
	 *            the new public id
	 */
	public void setPublicId(String publicId) {
		this.publicId = publicId;
	}

	/**
	 * Gets the like.
	 *
	 * @return the like
	 */
	public Integer getLike() {
		return like;
	}

	/**
	 * Sets the like.
	 *
	 * @param like
	 *            the new like
	 */
	public void setLike(Integer like) {
		this.like = like;
	}

	/**
	 * Gets the dislike.
	 *
	 * @return the dislike
	 */
	public Integer getDislike() {
		return dislike;
	}

	/**
	 * Sets the dislike.
	 *
	 * @param dislike
	 *            the new dislike
	 */
	public void setDislike(Integer dislike) {
		this.dislike = dislike;
	}

	public String getReplyText() {
		return replyText;
	}

	public void setReplyText(String replyText) {
		this.replyText = replyText;
	}

	public Date getReplyDate() {
		return replyDate;
	}

	public void setReplyDate(Date replyDate) {
		this.replyDate = replyDate;
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

	/**
	 * Manage like.
	 *
	 * @param likeFlag
	 *            the like flag
	 * @return the integer
	 */
	public Integer manageLike(Integer likeFlag) {
		if (this.like == null)
			this.like = 0;
		if (this.dislike == null)
			this.dislike = 0;

		if (likeFlag == 0)
			this.like++;
		else
			this.like--;

		return this.getLike();
	}

	/**
	 * Manage dis like.
	 *
	 * @param likeFlag
	 *            the like flag
	 * @return the integer
	 */
	public Integer manageDisLike(Integer likeFlag) {
		if (this.like == null)
			this.like = 0;
		if (this.dislike == null)
			this.dislike = 0;

		if (likeFlag == 0)
			this.dislike++;
		else
			this.dislike--;

		return this.getDislike();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((businessAddress == null) ? 0 : businessAddress.hashCode());
		result = prime * result + ((businessName == null) ? 0 : businessName.hashCode());
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((dislike == null) ? 0 : dislike.hashCode());
		result = prime * result + ((like == null) ? 0 : like.hashCode());
		result = prime * result + (negativeReview ? 1231 : 1237);
		result = prime * result + (neutralReview ? 1231 : 1237);
		result = prime * result + (positiveReview ? 1231 : 1237);
		result = prime * result + ((postedBy == null) ? 0 : postedBy.hashCode());
		result = prime * result + ((postedEmail == null) ? 0 : postedEmail.hashCode());
		result = prime * result + ((postedType == null) ? 0 : postedType.hashCode());
		result = prime * result + ((publicId == null) ? 0 : publicId.hashCode());
		result = prime * result + ((replyDate == null) ? 0 : replyDate.hashCode());
		result = prime * result + ((replyText == null) ? 0 : replyText.hashCode());
		result = prime * result + ((reviewDate == null) ? 0 : reviewDate.hashCode());
		result = prime * result + ((reviewId == null) ? 0 : reviewId.hashCode());
		result = prime * result + ((reviewRating == null) ? 0 : reviewRating.hashCode());
		result = prime * result + ((reviewText == null) ? 0 : reviewText.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
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
		if (dislike == null) {
			if (other.dislike != null)
				return false;
		} else if (!dislike.equals(other.dislike))
			return false;
		if (like == null) {
			if (other.like != null)
				return false;
		} else if (!like.equals(other.like))
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
		if (publicId == null) {
			if (other.publicId != null)
				return false;
		} else if (!publicId.equals(other.publicId))
			return false;
		if (replyDate == null) {
			if (other.replyDate != null)
				return false;
		} else if (!replyDate.equals(other.replyDate))
			return false;
		if (replyText == null) {
			if (other.replyText != null)
				return false;
		} else if (!replyText.equals(other.replyText))
			return false;
		if (reviewDate == null) {
			if (other.reviewDate != null)
				return false;
		} else if (!reviewDate.equals(other.reviewDate))
			return false;
		if (reviewId == null) {
			if (other.reviewId != null)
				return false;
		} else if (!reviewId.equals(other.reviewId))
			return false;
		if (reviewRating == null) {
			if (other.reviewRating != null)
				return false;
		} else if (!reviewRating.equals(other.reviewRating))
			return false;
		if (reviewText == null) {
			if (other.reviewText != null)
				return false;
		} else if (!reviewText.equals(other.reviewText))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}

}
