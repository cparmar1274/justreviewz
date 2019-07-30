package org.reviewmanager.pojo;

// TODO: Auto-generated Javadoc
/**
 * The Class PlaceObject.
 */
public class PlaceObject {

	/** The city. */
	String city;

	/** The province. */
	String province;

	/** The country. */
	String country;

	/** The province code. */
	String provinceCode;

	/** The postal code. */
	String postalCode;

	/** The area. */
	String area;

	/** The latitude. */
	String latitude;

	/** The longitude. */
	String longitude;

	/** The area code. */
	String areaCode;

	/** The time zone. */
	String timeZone;

	/**
	 * Instantiates a new place object.
	 *
	 * @param city
	 *            the city
	 * @param province
	 *            the province
	 * @param country
	 *            the country
	 * @param province_code
	 *            the province code
	 * @param postalCode
	 *            the postal code
	 * @param area
	 *            the area
	 * @param latitude
	 *            the latitude
	 * @param longitude
	 *            the longitude
	 * @param area_code
	 *            the area code
	 * @param timeZone
	 *            the time zone
	 */
	public PlaceObject(String city, String province, String country, String province_code, String postalCode,
			String area, String latitude, String longitude, String area_code, String timeZone) {
		super();
		this.city = city;
		this.province = province;
		this.country = country;
		this.provinceCode = province_code;
		this.postalCode = postalCode;
		this.area = area;
		this.latitude = latitude;
		this.longitude = longitude;
		this.areaCode = area_code;
		this.timeZone = timeZone;
	}

	/**
	 * Gets the city.
	 *
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * Sets the city.
	 *
	 * @param city
	 *            the new city
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * Gets the province.
	 *
	 * @return the province
	 */
	public String getProvince() {
		return province;
	}

	/**
	 * Sets the province.
	 *
	 * @param province
	 *            the new province
	 */
	public void setProvince(String province) {
		this.province = province;
	}

	/**
	 * Gets the country.
	 *
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}

	/**
	 * Sets the country.
	 *
	 * @param country
	 *            the new country
	 */
	public void setCountry(String country) {
		this.country = country;
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
	 * @param postalCode
	 *            the new postal code
	 */
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	/**
	 * Gets the area.
	 *
	 * @return the area
	 */
	public String getArea() {
		return area;
	}

	/**
	 * Sets the area.
	 *
	 * @param area
	 *            the new area
	 */
	public void setArea(String area) {
		this.area = area;
	}

	/**
	 * Gets the latitude.
	 *
	 * @return the latitude
	 */
	public String getLatitude() {
		return latitude;
	}

	/**
	 * Sets the latitude.
	 *
	 * @param latitude
	 *            the new latitude
	 */
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	/**
	 * Gets the longitude.
	 *
	 * @return the longitude
	 */
	public String getLongitude() {
		return longitude;
	}

	/**
	 * Sets the longitude.
	 *
	 * @param longitude
	 *            the new longitude
	 */
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	/**
	 * Gets the time zone.
	 *
	 * @return the time zone
	 */
	public String getTimeZone() {
		return timeZone;
	}

	/**
	 * Sets the time zone.
	 *
	 * @param timeZone
	 *            the new time zone
	 */
	public void setTimeZone(String timeZone) {
		this.timeZone = timeZone;
	}

	/**
	 * Gets the province code.
	 *
	 * @return the province code
	 */
	public String getProvinceCode() {
		return provinceCode;
	}

	/**
	 * Sets the province code.
	 *
	 * @param provinceCode
	 *            the new province code
	 */
	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}

	/**
	 * Gets the area code.
	 *
	 * @return the area code
	 */
	public String getAreaCode() {
		return areaCode;
	}

	/**
	 * Sets the area code.
	 *
	 * @param areaCode
	 *            the new area code
	 */
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
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
		result = prime * result + ((area == null) ? 0 : area.hashCode());
		result = prime * result + ((areaCode == null) ? 0 : areaCode.hashCode());
		result = prime * result + ((city == null) ? 0 : city.hashCode());
		result = prime * result + ((country == null) ? 0 : country.hashCode());
		result = prime * result + ((latitude == null) ? 0 : latitude.hashCode());
		result = prime * result + ((longitude == null) ? 0 : longitude.hashCode());
		result = prime * result + ((postalCode == null) ? 0 : postalCode.hashCode());
		result = prime * result + ((province == null) ? 0 : province.hashCode());
		result = prime * result + ((provinceCode == null) ? 0 : provinceCode.hashCode());
		result = prime * result + ((timeZone == null) ? 0 : timeZone.hashCode());
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
		PlaceObject other = (PlaceObject) obj;
		if (area == null) {
			if (other.area != null)
				return false;
		} else if (!area.equals(other.area))
			return false;
		if (areaCode == null) {
			if (other.areaCode != null)
				return false;
		} else if (!areaCode.equals(other.areaCode))
			return false;
		if (city == null) {
			if (other.city != null)
				return false;
		} else if (!city.equals(other.city))
			return false;
		if (country == null) {
			if (other.country != null)
				return false;
		} else if (!country.equals(other.country))
			return false;
		if (latitude == null) {
			if (other.latitude != null)
				return false;
		} else if (!latitude.equals(other.latitude))
			return false;
		if (longitude == null) {
			if (other.longitude != null)
				return false;
		} else if (!longitude.equals(other.longitude))
			return false;
		if (postalCode == null) {
			if (other.postalCode != null)
				return false;
		} else if (!postalCode.equals(other.postalCode))
			return false;
		if (province == null) {
			if (other.province != null)
				return false;
		} else if (!province.equals(other.province))
			return false;
		if (provinceCode == null) {
			if (other.provinceCode != null)
				return false;
		} else if (!provinceCode.equals(other.provinceCode))
			return false;
		if (timeZone == null) {
			if (other.timeZone != null)
				return false;
		} else if (!timeZone.equals(other.timeZone))
			return false;
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return city + " " + province + " " + country + " " + provinceCode + " " + postalCode;
	}

}
