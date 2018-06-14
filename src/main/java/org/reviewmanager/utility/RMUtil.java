package org.reviewmanager.utility;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateUtils;
import org.joda.time.DateTime;
import org.reviewmanager.pojo.Address;
import org.reviewmanager.pojo.ApplicationError;
import org.reviewmanager.pojo.ReviewManagerUser;
import org.reviewmanager.pojo.ReviewObject;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class RMUtil {
	
	
	
	public static final String STRIPE_API_KEY = "sk_test_VHkhTicB0u0O9eWWlLQVhyuo";

	// Manage Review
	public static final String REVIEW_INDEX = "review_index";
	public static final String REVIEW_TYPE = "review_type";

	// Manage Competitor
	public static final String COMPETITOR_INDEX = "competitor_index";
	public static final String COMPETITOR_TYPE = "competitor_type";

	// Manage Dashboard
	public static final String DASHBOARD_INDEX = "dashboard_index";
	public static final String DASHBOARD_TYPE = "dashboard_type";

	// Manage Trends
	public static final String TRENDING_INDEX = "trending_index";
	public static final String TRENDING_TYPE = "trending_type";

	// Manage User
	public static final String USER_INDEX = "user_index";
	public static final String USER_TYPE = "user_type";

	// Manage Action Items
	public static final String ACTION_ITEM_INDEX = "action_item_index";
	public static final String ACTION_ITEM_TYPE = "action_item_type";
	
	public static final String ERROR_INDEX = "error_index";
	public static final String ERROR_TYPE = "error_type";


	public static ReviewManagerUser getSessionedUser() {
		ReviewManagerUser sessionedUser = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof ReviewManagerUser) {
			sessionedUser = (ReviewManagerUser) principal;
		}
		return sessionedUser;
	}

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

	public static Map<String, Object> getMap(Object obj) {
		Map<String, Object> data = new HashMap<String, Object>();
		Gson gson = new Gson();
		data = gson.fromJson(gson.toJson(obj), Map.class);
		return data;
	}

	public static ReviewManagerUser getUserObject(JsonObject jsonData) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("USER"));

		ReviewManagerUser reviewUser = new ReviewManagerUser(jsonData.get("username").getAsString(),
				jsonData.get("password").getAsString(), jsonData.get("enabled").getAsBoolean(),
				jsonData.get("accountNonExpired").getAsBoolean(), jsonData.get("credentialsNonExpired").getAsBoolean(),
				jsonData.get("accountNonLocked").getAsBoolean(), authorities);

		Gson gson = new Gson();

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
		return reviewUser;
	}
	
	
	public static Map<String,Object> getApplicationError(String className,String methodName,String errorDetail){
		ApplicationError error = new ApplicationError(RMUtil.getSessionedUser().getClientId(),className, methodName,errorDetail,new Date());
		return RMUtil.getMap(error);
	}

	public static boolean isMonthSame(String ratingDate, String postedDate) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		Calendar cal = Calendar.getInstance();
		Date date;
		try {
		date = dateFormat.parse(ratingDate);
		cal.setTime(date);
		int ratingMonth = cal.get(Calendar.MONTH);
		date= dateFormat.parse(postedDate);
		cal.setTime(date);
		int postedMonth = cal.get(Calendar.MONTH);
		return ratingMonth == postedMonth;
		} catch (ParseException e) {
			return false;
		}
		
	}

	public static long getBillingCycleAnchor() {
		DateTime date = new DateTime();
		//date.plusDays(15);
		return date.getMillis();
	}

	
	public static BCryptPasswordEncoder getBCrypt(){
		return new BCryptPasswordEncoder();
	}

	public static ReviewObject convertToReview(String reviewObjectString) {
		String[] reviewArray = reviewObjectString.split("#");
		ReviewObject reviewObject = null;
		//cparmar123#cccchirag@gmail.com#35 Kingsbridge garden circle#Mississauga#L5R3Z5#Ontario#Canada#3.5#2018-06-13#Its a busy place. 
		if(reviewArray.length>=10)
		 reviewObject = new ReviewObject(reviewArray[0],reviewArray[1],reviewArray[2],reviewArray[3],reviewArray[4],reviewArray[5],reviewArray[6],reviewArray[7],reviewArray[8],reviewArray[9]);
		return reviewObject;
	}
}
