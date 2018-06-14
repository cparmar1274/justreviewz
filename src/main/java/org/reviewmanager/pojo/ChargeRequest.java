package org.reviewmanager.pojo;

public class ChargeRequest {

	public enum Currency {
		USD, CAD;
	}

	private String description;
	private int amount;
	private Currency currency;
	private String stripeEmail;
	private String stripeToken;

	public ChargeRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
	}

	public String getStripeEmail() {
		return stripeEmail;
	}

	public void setStripeEmail(String stripeEmail) {
		this.stripeEmail = stripeEmail;
	}

	public String getStripeToken() {
		return stripeToken;
	}

	public void setStripeToken(String stripeToken) {
		this.stripeToken = stripeToken;
	}

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