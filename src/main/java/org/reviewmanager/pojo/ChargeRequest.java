package org.reviewmanager.pojo;

// TODO: Auto-generated Javadoc
/**
 * The Class ChargeRequest.
 */
public class ChargeRequest {

	/**
	 * The Enum Currency.
	 */
	public enum Currency {

		/** The usd. */
		USD,
		/** The cad. */
		CAD;
	}

	/** The description. */
	private String description;

	/** The amount. */
	private int amount;

	/** The currency. */
	private Currency currency;

	/** The stripe email. */
	private String stripeEmail;

	/** The stripe token. */
	private String stripeToken;

	/**
	 * Instantiates a new charge request.
	 */
	public ChargeRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the description.
	 *
	 * @param description
	 *            the new description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Gets the amount.
	 *
	 * @return the amount
	 */
	public int getAmount() {
		return amount;
	}

	/**
	 * Sets the amount.
	 *
	 * @param amount
	 *            the new amount
	 */
	public void setAmount(int amount) {
		this.amount = amount;
	}

	/**
	 * Gets the currency.
	 *
	 * @return the currency
	 */
	public Currency getCurrency() {
		return currency;
	}

	/**
	 * Sets the currency.
	 *
	 * @param currency
	 *            the new currency
	 */
	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	/**
	 * Gets the stripe email.
	 *
	 * @return the stripe email
	 */
	public String getStripeEmail() {
		return stripeEmail;
	}

	/**
	 * Sets the stripe email.
	 *
	 * @param stripeEmail
	 *            the new stripe email
	 */
	public void setStripeEmail(String stripeEmail) {
		this.stripeEmail = stripeEmail;
	}

	/**
	 * Gets the stripe token.
	 *
	 * @return the stripe token
	 */
	public String getStripeToken() {
		return stripeToken;
	}

	/**
	 * Sets the stripe token.
	 *
	 * @param stripeToken
	 *            the new stripe token
	 */
	public void setStripeToken(String stripeToken) {
		this.stripeToken = stripeToken;
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
		result = prime * result + amount;
		result = prime * result + ((currency == null) ? 0 : currency.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((stripeEmail == null) ? 0 : stripeEmail.hashCode());
		result = prime * result + ((stripeToken == null) ? 0 : stripeToken.hashCode());
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
		ChargeRequest other = (ChargeRequest) obj;
		if (amount != other.amount)
			return false;
		if (currency != other.currency)
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (stripeEmail == null) {
			if (other.stripeEmail != null)
				return false;
		} else if (!stripeEmail.equals(other.stripeEmail))
			return false;
		if (stripeToken == null) {
			if (other.stripeToken != null)
				return false;
		} else if (!stripeToken.equals(other.stripeToken))
			return false;
		return true;
	}

}