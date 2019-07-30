package org.reviewmanager.pojo;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.util.StringUtil;

// TODO: Auto-generated Javadoc
/**
 * The Class EmailNotificationObject.
 */
public class EmailNotificationObject {

	/** The send to. */
	public String sendTo;

	/** The sender name. */
	public String senderName;

	/** The subject. */
	public String subject;

	/** The email content. */
	public String emailContent;

	/** The client id. */
	public String clientId;

	public EmailNotificationObject() {
		super();
	}

	/**
	 * Instantiates a new email notification object.
	 *
	 * @param sendTo
	 *            the send to
	 * @param senderName
	 *            the sender name
	 * @param subject
	 *            the subject
	 * @param emailContent
	 *            the email content
	 * @param clientId
	 *            the client id
	 */
	public EmailNotificationObject(String sendTo, String senderName, String subject, String emailContent,
			String clientId) {
		super();
		this.sendTo = sendTo;
		this.senderName = senderName;
		this.subject = subject;
		this.clientId = clientId;
		this.emailContent = emailContent;
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

	/**
	 * Gets the send to.
	 *
	 * @return the send to
	 */
	public String getSendTo() {
		return sendTo;
	}

	/**
	 * Sets the send to.
	 *
	 * @param sendTo
	 *            the new send to
	 */
	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}

	/**
	 * Gets the sender name.
	 *
	 * @return the sender name
	 */
	public String getSenderName() {
		return StringUtils.isEmpty(senderName) ? "User" : senderName;
	}

	/**
	 * Sets the sender name.
	 *
	 * @param senderName
	 *            the new sender name
	 */
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	/**
	 * Gets the subject.
	 *
	 * @return the subject
	 */
	public String getSubject() {
		return subject;
	}

	/**
	 * Sets the subject.
	 *
	 * @param subject
	 *            the new subject
	 */
	public void setSubject(String subject) {
		this.subject = subject;
	}

	/**
	 * Gets the email content.
	 *
	 * @return the email content
	 */
	public String getEmailContent() {
		return StringUtils.isEmpty(emailContent) ? "You have received notification from Just Reviewz portal."
				: emailContent;
	}

	/**
	 * Sets the email content.
	 *
	 * @param emailContent
	 *            the new email content
	 */
	public void setEmailContent(String emailContent) {
		this.emailContent = emailContent;
	}

}
