package org.reviewmanager.utility;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.reviewmanager.pojo.Address;
import org.reviewmanager.pojo.ApplicationError;
import org.reviewmanager.pojo.EmailNotificationObject;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.WorkingHours;
import org.reviewmanager.users.BusinessUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

// TODO: Auto-generated Javadoc
/**
 * The Class RMUtil.
 */
public class RMUtil {

	/** The Constant STRIPE_API_KEY. */
	public static final String STRIPE_API_KEY = "sk_test_VHkhTicB0u0O9eWWlLQVhyuo";
	public static final String STRIPE_PLAN_ID = "plan_ECGsl0UCnMhrcA";
	public static final String MAPBOX_KEY = "pk.eyJ1IjoiY3Bhcm1hcjEyMyIsImEiOiJjanBzbm5jZmkxbXZ2NDJwMThmZnlraXE3In0.bV8nm6fZv96XodKadG68PA";

	/** The Constant YELP_API_KEY. */
	public static final String[] YELP_API_KEY = {
			"Bearer X5AVjPYmpWRG_6tIqZTBByaWONIeQWbxuDnElKqOf-qT-wtOkaKEHuy_m3n120YFFZeeSCmr3otCApqhGd83H3h8ofTQHRNoAarYrIjreR8R0fOocqG-Yh_NJNfAW3Yx",
			"Bearer vqIyeE4KrhvCPwUCqp4IvGFHybrfKmgvHxiDSKWS90vNibj_pCDU1nMEYb2eiCUOANuTpi12BYJiQW5hiLODBb3533JKkq53KyIxGWI1pr1bgjinWxg4TnX4CA3nW3Yx",
			"Bearer RtUEUR5FsW3HjclkqWkFijUIh3FuoqUTpZcIyQxvFoCkrcbr-rxU7InA49p0f3QgUy0LZeb3qXzspCT__zAbpt5HbxMUnCBPOzdADzgEWOVEiySiv9TDErGUwhXnW3Yx" };

	/** The Constant ENV. */
	public static final String ENV = "dev";

	/** The Constant REVIEW_INDEX. */
	public static final String REVIEW_INDEX = "review_index";
	public static final String PRODUCT_INDEX = "product_index";
	public static final String COMPETITOR_INDEX = "competitor_index";
	public static final String DASHBOARD_INDEX = "dashboard_index";
	public static final String TRENDING_INDEX = "trending_index";
	public static final String USER_INDEX = "user_index";
	public static final String ACTION_ITEM_INDEX = "action_item_index";
	public static final String ERROR_INDEX = "error_index";
	public static final String ERROR_TYPE = "error_type";
	public static final String PERFORMER_INDEX = "performer_index";
	public static final String NOTIFICATION_INDEX = "notification_index";
	public static final String QUERY_INDEX = "query_index";
	public static final String PROMOTION_INDEX = "promotion_index";

	public static final String REVIEW_STRING_SPLITTER = "#";

	public static final Double POSITIVE_REVIEW_THRESHOLD = 3.0;
	public static final Integer PASSWORD_LENGTH = 30;
	public static final String PLACES_INDEX = "places_index";
	public static final String PROMOTION_COUNTER_INDEX = "promotion_counter_index";
	public static final String CLIENT_CUSTOMER_INDEX = "client_customer_index";

	/** The Constant ONBOARDED_BUSINESS. */
	public static final String ONBOARDED_BUSINESS = "onboarded_business";

	public static final Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").create();
	public static final String QUERY_ANSWERS = "query_answer_index";

	/**
	 * Gets the sessioned user.
	 *
	 * @return the sessioned user
	 */
	public static BusinessUser getSessionedUser() {
		BusinessUser sessionedUser = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof BusinessUser) {
			sessionedUser = (BusinessUser) principal;
		}
		return sessionedUser;
	}

	/**
	 * Gets the search page sizes.
	 *
	 * @param numberOfPages
	 *            the number of pages
	 * @return the search page sizes
	 */
	public static String getSearchPageSizes(Integer numberOfPages) {
		String pageString = "";
		if (numberOfPages == 0)
			return "1";

		for (int i = 0; i < numberOfPages + 1; i++)
			pageString += String.valueOf(i + 1) + ",";

		if (pageString.endsWith(","))
			pageString = pageString.substring(0, pageString.length() - 1);

		return pageString;
	}

	/**
	 * Gets the map.
	 *
	 * @param obj
	 *            the obj
	 * @return the map
	 */
	public static Map<String, Object> getMap(Object obj) {
		Map<String, Object> data = new HashMap<String, Object>();
		data = gson.fromJson(gson.toJson(obj), Map.class);
		return data;
	}

	/**
	 * Gets the user object.
	 *
	 * @param jsonData
	 *            the json data
	 * @return the user object
	 */
	public static BusinessUser getUserObject(JsonObject jsonData) {
		try {
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			authorities.add(new SimpleGrantedAuthority("USER"));

			BusinessUser reviewUser = new BusinessUser(jsonData.get("username").getAsString().toLowerCase(),
					jsonData.get("password").getAsString(), jsonData.get("enabled").getAsBoolean(),
					jsonData.get("accountNonExpired").getAsBoolean(),
					jsonData.get("credentialsNonExpired").getAsBoolean(),
					jsonData.get("accountNonLocked").getAsBoolean(), authorities);

			Address address = gson.fromJson(jsonData.get("address").toString(), Address.class);

			reviewUser.setAddress(address);
			reviewUser.setClientId(jsonData.get("clientId").getAsString());
			reviewUser.setSubscription(jsonData.get("subscription").getAsBoolean());
			reviewUser.setClientEmail(jsonData.get("clientEmail").getAsString());
			reviewUser.setClientName(jsonData.get("clientName").getAsString());
			reviewUser.setClientType(jsonData.get("clientType").getAsString());
			reviewUser.setNotifyAddedAsCompetitor(jsonData.get("notifyAddedAsCompetitor").getAsBoolean());
			reviewUser.setNotifyNewReport(jsonData.get("notifyNewReport").getAsBoolean());
			reviewUser.setNotifyNewReview(jsonData.get("notifyNewReview").getAsBoolean());
			reviewUser.setYelpUrl(jsonData.get("yelpUrl").getAsString());
			reviewUser.setFacebookUrl(jsonData.get("facebookUrl").getAsString());
			reviewUser.setClientBusinessUrl(jsonData.get("clientBusinessUrl").getAsString());

			reviewUser.setClientBusinessPhoneNumber(jsonData.get("clientBusinessPhoneNumber") != null
					? jsonData.get("clientBusinessPhoneNumber").getAsString() : StringUtils.EMPTY);
			reviewUser.setWorkingHours(jsonData.get("workingHours") != null
					? RMUtil.gson.fromJson(jsonData.get("workingHours"), WorkingHours.class) : new WorkingHours());
			return reviewUser;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	/**
	 * Gets the application error.
	 *
	 * @param className
	 *            the class name
	 * @param methodName
	 *            the method name
	 * @param errorDetail
	 *            the error detail
	 * @return the application error
	 */
	public static Map<String, Object> getApplicationError(String className, String methodName, String errorDetail) {
		ApplicationError error = new ApplicationError(RMUtil.getSessionedUser().getClientId(), className, methodName,
				errorDetail, new Date());
		return RMUtil.getMap(error);
	}

	/**
	 * Checks if is month same.
	 *
	 * @param ratingDate
	 *            the rating date
	 * @param postedDate
	 *            the posted date
	 * @return true, if is month same
	 */
	public static boolean isMonthSame(Date ratingDate, Date postedDate) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		Calendar cal = Calendar.getInstance();
		Date date;
		try {
			date = ratingDate;
			cal.setTime(date);
			int ratingMonth = cal.get(Calendar.MONTH);
			date = postedDate;
			cal.setTime(date);
			int postedMonth = cal.get(Calendar.MONTH);
			return ratingMonth == postedMonth;
		} catch (Exception e) {
			return false;
		}

	}

	/**
	 * Gets the billing cycle anchor.
	 *
	 * @return the billing cycle anchor
	 */
	public static long getBillingCycleAnchor() {
		DateTime date = new DateTime();
		// date.plusDays(15);
		return date.getMillis();
	}

	/**
	 * Gets the b crypt.
	 *
	 * @return the b crypt
	 */
	public static BCryptPasswordEncoder getBCrypt() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * Convert to review.
	 *
	 * @param reviewObjectString
	 *            the review object string
	 * @return the review object
	 */
	public static ReviewObject convertToReview(String reviewObjectString) {
		String[] reviewArray = reviewObjectString.split(RMUtil.REVIEW_STRING_SPLITTER);
		ReviewObject reviewObject = null;
		if (reviewArray.length >= 11)
			reviewObject = new ReviewObject(reviewArray[0], reviewArray[1], reviewArray[2], reviewArray[3],
					reviewArray[4], reviewArray[5]);
		return reviewObject;
	}

	/**
	 * Generate random password text.
	 *
	 * @return the string
	 */
	public static String generateRandomPasswordText() {
		String[] charArray = new String[] { "A", "B", "C", "1", "D", "E", "{", "F", "G", "H", "2", "%", "I", "J", "K",
				"L", "M", "_", "N", "3", "+", "=", "O", "P", "[", "Q", "R", "S", "$", "(", "T", "U", "V", ")", "W", "}",
				"X", "~", "Y", "Z", "a", "b", "c", "d", "9", "e", "]", "f", "g", "h", "i", "j", "k", "l", "@", "6", "m",
				"n", "o", "p", "!", "q", "r", "s", "#", "t", "u", "v", "w", "x", "-", "y", "z" };
		Random random = new Random();
		StringBuffer password = new StringBuffer();
		for (int i = 0; i < RMUtil.PASSWORD_LENGTH; i++)
			password.append(charArray[random.nextInt(charArray.length)]);
		return password.toString();
	}

	/**
	 * Checks if is expired.
	 *
	 * @param promotionStartDate
	 *            the promotion start date
	 * @param promotionEndDate
	 *            the promotion end date
	 * @return true, if is expired
	 */
	public static boolean isExpired(String promotionStartDate, String promotionEndDate) {
		DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern("M/d/Y");
		DateTime startTime = DateTime.parse(promotionStartDate, dateTimeFormatter);
		DateTime endTime = DateTime.parse(promotionEndDate, dateTimeFormatter);
		if (startTime.isBeforeNow() && endTime.isAfterNow())
			return true;
		else
			return false;
	}

	/**
	 * Gets the email template.
	 *
	 * @param emailNotificationObject
	 *            the email notification object
	 * @return the email template
	 */
	public static String getEmailTemplate(EmailNotificationObject emailNotificationObject, String cid) {
		StringBuffer stringBuffer = new StringBuffer();

		stringBuffer
				.append("<div style='display: block;border: 1px solid #e2e2e2;background-color:#51bf99!important;box-shadow: none;padding: 20px;font-family: Tahoma, Geneva, sans-serif;'>")
				.append("<div style='padding: 10px;'>")
				.append("<img src='cid:" + cid
						+ "' width='50' height='50' class='d-inline-block align-top' alt='Just Reviewz Inc'> Just Reviewz Inc.")
				.append("<br>").append("</div>").append("<div style='padding: 20px;font-size:14px;'>")
				.append("<span>Dear ").append(emailNotificationObject.getSenderName()).append("</span><br><br>")
				.append("<span>").append(emailNotificationObject.getEmailContent()).append("</span>").append("</div>")
				.append("<div style='padding: 20px;font-size:12px;color:#efefef !important'>")
				.append("This message was sent from Just Reviewz Inc and intended for ")
				.append(emailNotificationObject.getSendTo())
				.append(". If you prefer not to receive any communication emails from Just Reviewz.")
				.append("Please <a href='http://www.justreviewz.com/unsubscribe?email=")
				.append(emailNotificationObject.getSendTo()).append("&clientId=")
				.append(emailNotificationObject.getClientId()).append("'>Unsubscribe</a>.").append("</div>")
				.append("</div>");

		return stringBuffer.toString();
	}

	public static boolean isOpenToday(WorkingHours workingHours) {
		return false;
	}

}
