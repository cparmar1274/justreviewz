package org.reviewmanager.pojo;

import java.util.Date;
import java.util.Map;

import org.reviewmanager.utility.RMUtil;

public class Notification {
	
	public String notificationId;
	
	public String clientUserName;

	public String notificationText;
	
	public boolean isRead;
	
	public Date notificationTime;

	public Notification(String clientUserName,String notificationText, boolean isRead, Date notificationTime) {
		super();
		this.clientUserName = clientUserName;
		this.notificationText = notificationText;
		this.isRead = isRead;
		this.notificationTime = notificationTime;
	}

	
	
	public String getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(String notificationId) {
		this.notificationId = notificationId;
	}

	public String getNotificationText() {
		return notificationText;
	}

	public void setNotificationText(String notificationText) {
		this.notificationText = notificationText;
	}

	public boolean isRead() {
		return isRead;
	}

	public void setRead(boolean isRead) {
		this.isRead = isRead;
	}

	public Date getNotificationTime() {
		return notificationTime;
	}

	public void setNotificationTime(Date notificationTime) {
		this.notificationTime = notificationTime;
	}

	public String getClientUserName() {
		return clientUserName;
	}

	public void setClientUserName(String clientUserName) {
		this.clientUserName = clientUserName;
	}

	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((clientUserName == null) ? 0 : clientUserName.hashCode());
		result = prime * result + (isRead ? 1231 : 1237);
		result = prime * result + ((notificationId == null) ? 0 : notificationId.hashCode());
		result = prime * result + ((notificationText == null) ? 0 : notificationText.hashCode());
		result = prime * result + ((notificationTime == null) ? 0 : notificationTime.hashCode());
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
		Notification other = (Notification) obj;
		if (clientUserName == null) {
			if (other.clientUserName != null)
				return false;
		} else if (!clientUserName.equals(other.clientUserName))
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



	public Map<String,Object> getMap(){
		return RMUtil.getMap(this);
	}
	
	
}
