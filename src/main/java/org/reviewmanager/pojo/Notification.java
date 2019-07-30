package org.reviewmanager.pojo;

import java.util.Date;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

// TODO: Auto-generated Javadoc
/**
 * The Class Notification.
 */
public class Notification {

	/** The notification id. */
	public String notificationId;

	/** The client id. */
	public String clientId;

	/** The notification text. */
	public String notificationText;

	/** The is read. */
	public boolean isRead;

	/** The notification time. */
	public String notificationTime;

	/**
	 * Instantiates a new notification.
	 *
	 * @param clientId
	 *            the client id
	 * @param notificationText
	 *            the notification text
	 * @param isRead
	 *            the is read
	 * @param notificationTime
	 *            the notification time
	 */
	public Notification(String clientId, String notificationText, boolean isRead, Date notificationTime) {
		super();
		this.clientId = clientId;
		this.notificationText = notificationText;
		this.isRead = isRead;
		this.notificationTime = notificationTime.toString();
	}

	/**
	 * Gets the notification id.
	 *
	 * @return the notification id
	 */
	public String getNotificationId() {
		return notificationId;
	}

	/**
	 * Sets the notification id.
	 *
	 * @param notificationId
	 *            the new notification id
	 */
	public void setNotificationId(String notificationId) {
		this.notificationId = notificationId;
	}

	/**
	 * Gets the notification text.
	 *
	 * @return the notification text
	 */
	public String getNotificationText() {
		return notificationText;
	}

	/**
	 * Sets the notification text.
	 *
	 * @param notificationText
	 *            the new notification text
	 */
	public void setNotificationText(String notificationText) {
		this.notificationText = notificationText;
	}

	/**
	 * Checks if is read.
	 *
	 * @return true, if is read
	 */
	public boolean isRead() {
		return isRead;
	}

	/**
	 * Sets the read.
	 *
	 * @param isRead
	 *            the new read
	 */
	public void setRead(boolean isRead) {
		this.isRead = isRead;
	}

	/**
	 * Gets the notification time.
	 *
	 * @return the notification time
	 */
	public String getNotificationTime() {
		return notificationTime;
	}

	/**
	 * Sets the notification time.
	 *
	 * @param notificationTime
	 *            the new notification time
	 */
	public void setNotificationTime(Date notificationTime) {
		this.notificationTime = notificationTime.toString();
	}

	/**
	 * Gets the client id.
	 *
	 * @return the client id
	 */
	public String getClientId() {
		return clientId;
	}

	/**
	 * Sets the client id.
	 *
	 * @param clientId
	 *            the new client id
	 */
	public void setClientId(String clientId) {
		this.clientId = clientId;
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
		result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
		result = prime * result + (isRead ? 1231 : 1237);
		result = prime * result + ((notificationId == null) ? 0 : notificationId.hashCode());
		result = prime * result + ((notificationText == null) ? 0 : notificationText.hashCode());
		result = prime * result + ((notificationTime == null) ? 0 : notificationTime.hashCode());
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
		Notification other = (Notification) obj;
		if (clientId == null) {
			if (other.clientId != null)
				return false;
		} else if (!clientId.equals(other.clientId))
			return false;
		if (isRead != other.isRead)
			return false;
		if (notificationId == null) {
			if (other.notificationId != null)
				return false;
		} else if (!notificationId.equals(other.notificationId))
			return false;
		if (notificationText == null) {
			if (other.notificationText != null)
				return false;
		} else if (!notificationText.equals(other.notificationText))
			return false;
		if (notificationTime == null) {
			if (other.notificationTime != null)
				return false;
		} else if (!notificationTime.equals(other.notificationTime))
			return false;
		return true;
	}

	/**
	 * Gets the map.
	 *
	 * @return the map
	 */
	public Map<String, Object> getMap() {
		return RMUtil.getMap(this);
	}

}
