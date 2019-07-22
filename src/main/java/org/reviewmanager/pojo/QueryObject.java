package org.reviewmanager.pojo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class QueryObject.
 */
@JsonIgnoreProperties(ignoreUnknown = true, allowGetters = false, allowSetters = false)
public class QueryObject {

	/** The query id. */
	@JsonProperty("queryId")
	public String queryId;

	/** The client id. */
	@JsonProperty("clientId")
	public String clientId;

	/** The question. */
	@JsonProperty("question")
	public String question;
	
	@JsonProperty("type")
	public String type;

	/** The answer. */
	@JsonProperty("answer")
	public String answer;

	/** The posted by. */
	@JsonProperty("postedBy")
	public String postedBy;

	/** The posted email. */
	@JsonProperty("postedEmail")
	public String postedEmail;

	/** The posted date. */
	@JsonProperty("postedDate")
	public String postedDate;

	/**
	 * Instantiates a new query object.
	 */
	public QueryObject() {
		super();
	}

	/**
	 * Instantiates a new query object.
	 *
	 * @param queryId the query id
	 * @param clientId the client id
	 * @param question the question
	 * @param answer the answer
	 * @param postedBy the posted by
	 * @param postedEmail the posted email
	 * @param postedDate the posted date
	 */
	public QueryObject(String queryId, String clientId, String question, String answer, String postedBy,
			String postedEmail, String postedDate,String type) {
		super();
		this.queryId = queryId;
		this.clientId = clientId;
		this.question = question;
		this.answer = answer;
		this.postedBy = postedBy;
		this.postedEmail = postedEmail;
		this.postedDate = postedDate;
		this.type = type;
	}

	/**
	 * Gets the query id.
	 *
	 * @return the query id
	 */
	public String getQueryId() {
		return queryId;
	}

	/**
	 * Sets the query id.
	 *
	 * @param queryId the new query id
	 */
	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}

	/**
	 * Sets the posted date.
	 *
	 * @param postedDate the new posted date
	 */
	public void setPostedDate(String postedDate) {
		this.postedDate = postedDate;
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
	 * Gets the question.
	 *
	 * @return the question
	 */
	public String getQuestion() {
		return question;
	}

	/**
	 * Sets the question.
	 *
	 * @param question the new question
	 */
	public void setQuestion(String question) {
		this.question = question;
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
	 * @param postedBy the new posted by
	 */
	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
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
	 * @param postedEmail the new posted email
	 */
	public void setPostedEmail(String postedEmail) {
		this.postedEmail = postedEmail;
	}

	/**
	 * Gets the answer.
	 *
	 * @return the answer
	 */
	public String getAnswer() {
		return answer;
	}

	/**
	 * Sets the answer.
	 *
	 * @param answer the new answer
	 */
	public void setAnswer(String answer) {
		this.answer = answer;
	}

	/**
	 * Gets the posted date.
	 *
	 * @return the posted date
	 */
	public String getPostedDate() {
		return postedDate;
	}

	/**
	 * Sets the posted date.
	 *
	 * @param postedDate the new posted date
	 */
	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate.toString();
	}

	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((answer == null) ? 0 : answer.hashCode());
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + ((postedBy == null) ? 0 : postedBy.hashCode());
		result = prime * result + ((postedDate == null) ? 0 : postedDate.hashCode());
		result = prime * result + ((postedEmail == null) ? 0 : postedEmail.hashCode());
		result = prime * result + ((queryId == null) ? 0 : queryId.hashCode());
		result = prime * result + ((question == null) ? 0 : question.hashCode());
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
		QueryObject other = (QueryObject) obj;
		if (answer == null) {
			if (other.answer != null)
				return false;
		} else if (!answer.equals(other.answer))
			return false;
		if (clientId == null) {
			if (other.clientId != null)
				return false;
		} else if (!clientId.equals(other.clientId))
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
		if (postedEmail == null) {
			if (other.postedEmail != null)
				return false;
		} else if (!postedEmail.equals(other.postedEmail))
			return false;
		if (queryId == null) {
			if (other.queryId != null)
				return false;
		} else if (!queryId.equals(other.queryId))
			return false;
		if (question == null) {
			if (other.question != null)
				return false;
		} else if (!question.equals(other.question))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "QueryObject [queryId=" + queryId + ", clientId=" + clientId + ", question=" + question + ", answer="
				+ answer + ", postedBy=" + postedBy + ", postedEmail=" + postedEmail + ", postedDate=" + postedDate
				+ "]";
	}

}
