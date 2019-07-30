package org.reviewmanager.pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkingHours {

	@JsonProperty("monday")
	public String monday;
	@JsonProperty("tuesday")
	public String tuesday;
	@JsonProperty("wednesday")
	public String wednesday;
	@JsonProperty("thursday")
	public String thursday;
	@JsonProperty("friday")
	public String friday;
	@JsonProperty("saturday")
	public String saturday;
	@JsonProperty("sunday")
	public String sunday;

	public WorkingHours() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WorkingHours(String workingHours) {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMonday() {
		return monday;
	}

	public void setMonday(String monday) {
		this.monday = monday;
	}

	public String getTuesday() {
		return tuesday;
	}

	public void setTuesday(String tuesday) {
		this.tuesday = tuesday;
	}

	public String getWednesday() {
		return wednesday;
	}

	public void setWednesday(String wednesday) {
		this.wednesday = wednesday;
	}

	public String getThursday() {
		return thursday;
	}

	public void setThursday(String thursday) {
		this.thursday = thursday;
	}

	public String getFriday() {
		return friday;
	}

	public void setFriday(String friday) {
		this.friday = friday;
	}

	public String getSaturday() {
		return saturday;
	}

	public void setSaturday(String saturday) {
		this.saturday = saturday;
	}

	public String getSunday() {
		return sunday;
	}

	public void setSunday(String sunday) {
		this.sunday = sunday;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((friday == null) ? 0 : friday.hashCode());
		result = prime * result + ((monday == null) ? 0 : monday.hashCode());
		result = prime * result + ((saturday == null) ? 0 : saturday.hashCode());
		result = prime * result + ((sunday == null) ? 0 : sunday.hashCode());
		result = prime * result + ((thursday == null) ? 0 : thursday.hashCode());
		result = prime * result + ((tuesday == null) ? 0 : tuesday.hashCode());
		result = prime * result + ((wednesday == null) ? 0 : wednesday.hashCode());
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
		WorkingHours other = (WorkingHours) obj;
		if (friday == null) {
			if (other.friday != null)
				return false;
		} else if (!friday.equals(other.friday))
			return false;
		if (monday == null) {
			if (other.monday != null)
				return false;
		} else if (!monday.equals(other.monday))
			return false;
		if (saturday == null) {
			if (other.saturday != null)
				return false;
		} else if (!saturday.equals(other.saturday))
			return false;
		if (sunday == null) {
			if (other.sunday != null)
				return false;
		} else if (!sunday.equals(other.sunday))
			return false;
		if (thursday == null) {
			if (other.thursday != null)
				return false;
		} else if (!thursday.equals(other.thursday))
			return false;
		if (tuesday == null) {
			if (other.tuesday != null)
				return false;
		} else if (!tuesday.equals(other.tuesday))
			return false;
		if (wednesday == null) {
			if (other.wednesday != null)
				return false;
		} else if (!wednesday.equals(other.wednesday))
			return false;
		return true;
	}

}
