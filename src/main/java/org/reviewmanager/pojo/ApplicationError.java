package org.reviewmanager.pojo;

import java.util.Date;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

// TODO: Auto-generated Javadoc
/**
 * The Class ApplicationError.
 */
public class ApplicationError {

	/** The class name. */
	public String className;

	/** The method name. */
	public String methodName;

	/** The error detail. */
	public String errorDetail;

	/** The error date. */
	public Date errorDate;

	/** The user ID. */
	public String userID;

	/**
	 * Instantiates a new application error.
	 */
	public ApplicationError() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * Instantiates a new application error.
	 *
	 * @param userID
	 *            the user ID
	 * @param className
	 *            the class name
	 * @param methodName
	 *            the method name
	 * @param errorDetail
	 *            the error detail
	 * @param errorDate
	 *            the error date
	 */
	public ApplicationError(String userID, String className, String methodName, String errorDetail, Date errorDate) {
		super();
		this.className = className;
		this.methodName = methodName;
		this.errorDetail = errorDetail;
		this.errorDate = errorDate;
		this.userID = userID;
	}

	/**
	 * Gets the error map.
	 *
	 * @return the error map
	 */
	public Map<String, Object> getErrorMap() {
		return RMUtil.getMap(this);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((className == null) ? 0 : className.hashCode());
		result = prime * result + ((errorDate == null) ? 0 : errorDate.hashCode());
		result = prime * result + ((errorDetail == null) ? 0 : errorDetail.hashCode());
		result = prime * result + ((methodName == null) ? 0 : methodName.hashCode());
		result = prime * result + ((userID == null) ? 0 : userID.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
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
		ApplicationError other = (ApplicationError) obj;
		if (className == null) {
			if (other.className != null)
				return false;
		} else if (!className.equals(other.className))
			return false;
		if (errorDate == null) {
			if (other.errorDate != null)
				return false;
		} else if (!errorDate.equals(other.errorDate))
			return false;
		if (errorDetail == null) {
			if (other.errorDetail != null)
				return false;
		} else if (!errorDetail.equals(other.errorDetail))
			return false;
		if (methodName == null) {
			if (other.methodName != null)
				return false;
		} else if (!methodName.equals(other.methodName))
			return false;
		if (userID == null) {
			if (other.userID != null)
				return false;
		} else if (!userID.equals(other.userID))
			return false;
		return true;
	}

}
