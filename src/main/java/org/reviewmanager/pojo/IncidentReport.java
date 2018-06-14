package org.reviewmanager.pojo;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

public class IncidentReport {

	public File incidentImage;
	public String reporterEmail;
	public String vehicleNumber;
	public Map<String, Integer> reportReasons;
	public String incidentDescription;
	public String incidentCity;
	public String incidentCountry;
	public Date incidentDate;

	public Double severityCount;

	public File getIncidentImage() {
		return incidentImage;
	}

	public void setIncidentImage(File incidentImage) {
		this.incidentImage = incidentImage;
	}

	public String getReporterEmail() {
		return reporterEmail;
	}

	public void setReporterEmail(String reporterEmail) {
		this.reporterEmail = reporterEmail;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}

	public Map<String, Integer> getReportReasons() {
		return reportReasons;
	}

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

	public String getIncidentDescription() {
		return incidentDescription;
	}

	public void setIncidentDescription(String incidentDescription) {
		this.incidentDescription = incidentDescription;
	}

	public Double getDangerCount() {
		Double danger = new Double(0);
		for (Integer count : this.reportReasons.values())
			danger += count;
		return danger;
	}

	public String getIncidentCity() {
		return incidentCity;
	}

	public void setIncidentCity(String incidentCity) {
		this.incidentCity = incidentCity;
	}

	public String getIncidentCountry() {
		return incidentCountry;
	}

	public void setIncidentCountry(String incidentCountry) {
		this.incidentCountry = incidentCountry;
	}

	public Date getIncidentDate() {
		return incidentDate;
	}

	public void setIncidentDate(Date incidentDate) {
		this.incidentDate = incidentDate;
	}

	public Map<String, Object> getIncidentMap() {
		return RMUtil.getMap(this);
	}

}
