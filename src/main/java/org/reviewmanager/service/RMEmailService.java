package org.reviewmanager.service;

import java.net.URL;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.HtmlEmail;
import org.reviewmanager.pojo.EmailNotificationObject;
import org.reviewmanager.utility.RMUtil;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class RMEmailService.
 */
@Service
public class RMEmailService {

	/** The executor service. */
	public ExecutorService executorService = Executors.newFixedThreadPool(10);

	/**
	 * Instantiates a new RM email service.
	 */
	public RMEmailService() {
		super();
	}

	/**
	 * Send email notification.
	 *
	 * @param emailNotificationObject
	 *            the email notification object
	 * @return the map
	 */
	public Map<String, Object> sendEmailNotification(EmailNotificationObject emailNotificationObject) {
		Map<String, Object> data = new HashedMap<>();
		try {

			executorService.submit(() -> {
				HtmlEmail email = new HtmlEmail();
				email.setSmtpPort(465);
				email.setAuthenticator(new DefaultAuthenticator("support@justreviewz.com", "4jej$c2q(H"));
				email.setSSLOnConnect(true);
				email.setHostName("mail.privateemail.com");
				email.addTo(emailNotificationObject.getSendTo(), emailNotificationObject.getSenderName());

				// embed the image and get the content id
				URL url = new URL("http://www.justreviewz.com/public/justreviewz_logo_nav.png");
				String cid = email.embed(url, "Just Reviewz Inc");

				email.setFrom("support@justreviewz.com", "Just Reviewz Inc");
				email.setSubject(emailNotificationObject.getSubject());
				email.setHtmlMsg(getMessageType(emailNotificationObject, cid));
				email.send();
				return "send";
			});

		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}

	/**
	 * Gets the message type.
	 *
	 * @param emailNotificationObject
	 *            the email notification object
	 * @return the message type
	 */
	public String getMessageType(EmailNotificationObject emailNotificationObject, String cid) {
		return RMUtil.getEmailTemplate(emailNotificationObject, cid);

	}

	/*
	 * public static void main(String[] args) { try { RMEmailService service =
	 * new RMEmailService(); HtmlEmail email = new HtmlEmail();
	 * EmailNotificationObject emailNotificationObject = new
	 * EmailNotificationObject("chirag-parmar@live.com", "chriag Parmar",
	 * "test", "test", "cus_E5E9ReZkKslVjq"); email.setSmtpPort(465);
	 * email.setAuthenticator(new
	 * DefaultAuthenticator("support@justreviewz.com", "4jej$c2q(H"));
	 * email.setSSLOnConnect(true); email.setHostName("mail.privateemail.com");
	 * email.addTo(emailNotificationObject.getSendTo(),
	 * emailNotificationObject.getSenderName());
	 * email.setFrom("support@justreviewz.com", "Just Reviewz Inc");
	 * email.setSubject(emailNotificationObject.getSubject());
	 * email.setHtmlMsg(service.getMessageType(emailNotificationObject));
	 * email.send();
	 * 
	 * }catch(Exception ex) {
	 * 
	 * } }
	 */
}
