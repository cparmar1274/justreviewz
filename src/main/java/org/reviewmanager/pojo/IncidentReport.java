package org.reviewmanager.pojo;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

// TODO: Auto-generated Javadoc
/**
 * The Class IncidentReport.
 */
public class IncidentReport {

	/** The incident image. */
	public File									incidentImage;
	
	/** The reporter email. */
	public String								reporterEmail;
	
	/** The vehicle number. */
	public String								vehicleNumber;
	
	/** The report reasons. */
	public Map<String, Integer>	reportReasons;
	
	/** The incident description. */
	public String								incidentDescription;
	
	/** The incident city. */
	public String								incidentCity;
	
	/** The incident country. */
	public String								incidentCountry;
	
	/** The incident date. */
	public Date									incidentDate;

	/** The severity count. */
	public Double severityCount;

	/**
	 * Gets the incident image.
	 *
	 * @return the incident image
	 */
	public File getIncidentImage() {
		return incidentImage;
	}

	/**
	 * Sets the incident image.
	 *
	 * @param incidentImage the new incident image
	 */
	public void setIncidentImage(File incidentImage) {
		this.incidentImage = incidentImage;
	}

	/**
	 * Gets the reporter email.
	 *
	 * @return the reporter email
	 */
	public String getReporterEmail() {
		return reporterEmail;
	}

	/**
	 * Sets the reporter email.
	 *
	 * @param reporterEmail the new reporter email
	 */
	public void setReporterEmail(String reporterEmail) {
		this.reporterEmail = reporterEmail;
	}

	/**
	 * Gets the vehicle number.
	 *
	 * @return the vehicle number
	 */
	public String getVehicleNumber() {
		return vehicleNumber;
	}

	/**
	 * Sets the vehicle number.
	 *
	 * @param vehicleNumber the new vehicle number
	 */
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}

	/**
	 * Gets the report reasons.
	 *
	 * @return the report reasons
	 */
	public Map<String, Integer> getReportReasons() {
		return reportReasons;
	}

	/**
	 * Sets the report reasons.
	 *
	 * @param reportReasons the new report reasons
	 */
	public void setReportReasons(String[] reportReasons) {

		if (this.reportReasons == null)
			this.reportReasons = new HashMap<String, Integer>();

		for (String reason : reportReasons) {
			if (!this.reportReasons.containsKey(new String(reason.getBytes()))) {
				this.reportReasons.put(String.valueOf(reason), 1);
				continue;
			}

			Integer incidentCount = this.reportReasons.get(String.valueOf(reason));
			this.reportReasons.put(String.valueOf(reason), incidentCount++);

		}
	}

	/**
	 * Gets the incident description.
	 *
	 * @return the incident description
	 */
	public String getIncidentDescription() {
		return incidentDescription;
	}

	/**
	 * Sets the incident description.
	 *
	 * @param incidentDescription the new incident description
	 */
	public void setIncidentDescription(String incidentDescription) {
		this.incidentDescription = incidentDescription;
	}

	/**
	 * Gets the danger count.
	 *
	 * @return the danger count
	 */
	public Double getDangerCount() {
		Double danger = new Double(0);
		for (Integer count : this.reportReasons.values())
			danger += count;
		return danger;
	}

	/**
	 * Gets the incident city.
	 *
	 * @return the incident city
	 */
	public String getIncidentCity() {
		return incidentCity;
	}

	/**
	 * Sets the incident city.
	 *
	 * @param incidentCity the new incident city
	 */
	public void setIncidentCity(String incidentCity) {
		this.incidentCity = incidentCity;
	}

	/**
	 * Gets the incident country.
	 *
	 * @return the incident country
	 */
	public String getIncidentCountry() {
		return incidentCountry;
	}

	/**
	 * Sets the incident country.
	 *
	 * @param incidentCountry the new incident country
	 */
	public void setIncidentCountry(String incidentCountry) {
		this.incidentCountry = incidentCountry;
	}

	/**
	 * Gets the incident date.
	 *
	 * @return the incident date
	 */
	public Date getIncidentDate() {
		return incidentDate;
	}

	/**
	 * Sets the incident date.
	 *
	 * @param incidentDate the new incident date
	 */
	public void setIncidentDate(Date incidentDate) {
		this.incidentDate = incidentDate;
	}

	/**
	 * Gets the incident map.
	 *
	 * @return the incident map
	 */
	public Map<String, Object> getIncidentMap() {
		return RMUtil.getMap(this);
	}

}
