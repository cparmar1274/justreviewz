package org.reviewmanager.pojo;

// TODO: Auto-generated Javadoc
/**
 * The Class Subscription.
 */
public class Subscription {

	/** The credit card number. */
	public String creditCardNumber;

	/** The postal code. */
	public String postalCode;

	/** The cvv number. */
	public String cvvNumber;

	/** The billing cycle. */
	public String billingCycle;

	/**
	 * Instantiates a new subscription.
	 */
	public Subscription() {
		super();
	}

	/**
	 * Gets the credit card number.
	 *
	 * @return the credit card number
	 */
	public String getCreditCardNumber() {
		return creditCardNumber;
	}

	/**
	 * Sets the credit card number.
	 *
	 * @param creditCardNumber the new credit card number
	 */
	public void setCreditCardNumber(String creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	/**
	 * Gets the postal code.
	 *
	 * @return the postal code
	 */
	public String getPostalCode() {
		return postalCode;
	}

	/**
	 * Sets the postal code.
	 *
	 * @param postalCode the new postal code
	 */
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	/**
	 * Gets the cvv number.
	 *
	 * @return the cvv number
	 */
	public String getCvvNumber() {
		return cvvNumber;
	}

	/**
	 * Sets the cvv number.
	 *
	 * @param cvvNumber the new cvv number
	 */
	public void setCvvNumber(String cvvNumber) {
		this.cvvNumber = cvvNumber;
	}

	/**
	 * Gets the billing cycle.
	 *
	 * @return the billing cycle
	 */
	public String getBillingCycle() {
		return billingCycle;
	}

	/**
	 * Sets the billing cycle.
	 *
	 * @param billingCycle the new billing cycle
	 */
	public void setBillingCycle(String billingCycle) {
		this.billingCycle = billingCycle;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((billingCycle == null) ? 0 : billingCycle.hashCode());
		result = prime * result + ((creditCardNumber == null) ? 0 : creditCardNumber.hashCode());
		result = prime * result + ((cvvNumber == null) ? 0 : cvvNumber.hashCode());
		result = prime * result + ((postalCode == null) ? 0 : postalCode.hashCode());
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
		Subscription other = (Subscription) obj;
		if (billingCycle == null) {
			if (other.billingCycle != null)
				return false;
		} else if (!billingCycle.equals(other.billingCycle))
			return false;
		if (creditCardNumber == null) {
			if (other.creditCardNumber != null)
				return false;
		} else if (!creditCardNumber.equals(other.creditCardNumber))
			return false;
		if (cvvNumber == null) {
			if (other.cvvNumber != null)
				return false;
		} else if (!cvvNumber.equals(other.cvvNumber))
			return false;
		if (postalCode == null) {
			if (other.postalCode != null)
				return false;
		} else if (!postalCode.equals(other.postalCode))
			return false;
		return true;
	}

}
