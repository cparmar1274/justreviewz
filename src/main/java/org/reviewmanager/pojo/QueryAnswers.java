package org.reviewmanager.pojo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true, allowGetters = false, allowSetters = false)
public class QueryAnswers {
	
	@JsonProperty("queryId")
	public String queryId;
	@JsonProperty("answerByName")
	public String answerByName;
	@JsonProperty("answerByEmail")
	public String answerByEmail;
	@JsonProperty("answerText")
	public String answerText;
	@JsonProperty("answerDate")
	public Date answerDate;
	public QueryAnswers() {
		super();
	}
	public QueryAnswers(String queryId, String answerByName, String answerByEmail, String answerText) {
		super();
		this.queryId = queryId;
		this.answerByName = answerByName;
		this.answerByEmail = answerByEmail;
		this.answerText = answerText;
		this.answerDate = new Date();
	}
	public QueryAnswers(QueryObject queryObject) {
		this.queryId = queryObject.getQueryId();
		this.answerByName = queryObject.getAnsweredBy();
		this.answerByEmail = queryObject.getAnsweredEmail();
		this.answerText = queryObject.getAnswer();
		this.answerDate = new Date();
	}
	public String getQueryId() {
		return queryId;
	}
	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}
	public String getAnswerByName() {
		return answerByName;
	}
	public void setAnswerByName(String answerByName) {
		this.answerByName = answerByName;
	}
	public String getAnswerByEmail() {
		return answerByEmail;
	}
	public void setAnswerByEmail(String answerByEmail) {
		this.answerByEmail = answerByEmail;
	}
	public String getAnswerText() {
		return answerText;
	}
	public void setAnswerText(String answerText) {
		this.answerText = answerText;
	}
	public Date getAnswerDate() {
		return answerDate;
	}
	public void setAnswerDate(Date answerDate) {
		this.answerDate = answerDate;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((answerByEmail == null) ? 0 : answerByEmail.hashCode());
		result = prime * result + ((answerByName == null) ? 0 : answerByName.hashCode());
		result = prime * result + ((answerDate == null) ? 0 : answerDate.hashCode());
		result = prime * result + ((answerText == null) ? 0 : answerText.hashCode());
		result = prime * result + ((queryId == null) ? 0 : queryId.hashCode());
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
		QueryAnswers other = (QueryAnswers) obj;
		if (answerByEmail == null) {
			if (other.answerByEmail != null)
				return false;
		} else if (!answerByEmail.equals(other.answerByEmail))
			return false;
		if (answerByName == null) {
			if (other.answerByName != null)
				return false;
		} else if (!answerByName.equals(other.answerByName))
			return false;
		if (answerDate == null) {
			if (other.answerDate != null)
				return false;
		} else if (!answerDate.equals(other.answerDate))
			return false;
		if (answerText == null) {
			if (other.answerText != null)
				return false;
		} else if (!answerText.equals(other.answerText))
			return false;
		if (queryId == null) {
			if (other.queryId != null)
				return false;
		} else if (!queryId.equals(other.queryId))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "QueryAnswers [queryId=" + queryId + ", answerByName=" + answerByName + ", answerByEmail="
				+ answerByEmail + ", answerText=" + answerText + ", answerDate=" + answerDate + "]";
	}
		

}
