package org.reviewmanager.users;

// TODO: Auto-generated Javadoc
/**
 * The Class PublicUser.
 */
public class PublicUser {

	/** The public id. */
	public String publicId;

	/** The public name. */
	public String publicName;

	/** The public email. */
	public String publicEmail;

	/** The public contact number. */
	public String publicContactNumber;

	/**
	 * Instantiates a new public user.
	 */
	public PublicUser() {
		super();
	}

	/**
	 * Instantiates a new public user.
	 *
	 * @param publicId
	 *            the public id
	 * @param publicName
	 *            the public name
	 * @param publicEmail
	 *            the public email
	 * @param publicContactNumber
	 *            the public contact number
	 */
	public PublicUser(String publicId, String publicName, String publicEmail, String publicContactNumber) {
		super();
		this.publicId = publicId;
		this.publicName = publicName;
		this.publicEmail = publicEmail;
		this.publicContactNumber = publicContactNumber;
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
	 * Gets the public name.
	 *
	 * @return the public name
	 */
	public String getPublicName() {
		return publicName;
	}

	/**
	 * Sets the public name.
	 *
	 * @param publicName
	 *            the new public name
	 */
	public void setPublicName(String publicName) {
		this.publicName = publicName;
	}

	/**
	 * Gets the public email.
	 *
	 * @return the public email
	 */
	public String getPublicEmail() {
		return publicEmail;
	}

	/**
	 * Sets the public email.
	 *
	 * @param publicEmail
	 *            the new public email
	 */
	public void setPublicEmail(String publicEmail) {
		this.publicEmail = publicEmail;
	}

	/**
	 * Gets the public contact number.
	 *
	 * @return the public contact number
	 */
	public String getPublicContactNumber() {
		return publicContactNumber;
	}

	/**
	 * Sets the public contact number.
	 *
	 * @param publicContactNumber
	 *            the new public contact number
	 */
	public void setPublicContactNumber(String publicContactNumber) {
		this.publicContactNumber = publicContactNumber;
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
		result = prime * result + ((publicContactNumber == null) ? 0 : publicContactNumber.hashCode());
		result = prime * result + ((publicEmail == null) ? 0 : publicEmail.hashCode());
		result = prime * result + ((publicId == null) ? 0 : publicId.hashCode());
		result = prime * result + ((publicName == null) ? 0 : publicName.hashCode());
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
		PublicUser other = (PublicUser) obj;
		if (publicContactNumber == null) {
			if (other.publicContactNumber != null)
				return false;
		} else if (!publicContactNumber.equals(other.publicContactNumber))
			return false;
		if (publicEmail == null) {
			if (other.publicEmail != null)
				return false;
		} else if (!publicEmail.equals(other.publicEmail))
			return false;
		if (publicId == null) {
			if (other.publicId != null)
				return false;
		} else if (!publicId.equals(other.publicId))
			return false;
		if (publicName == null) {
			if (other.publicName != null)
				return false;
		} else if (!publicName.equals(other.publicName))
			return false;
		return true;
	}

}
