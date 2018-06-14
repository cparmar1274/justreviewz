package org.reviewmanager.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.ReviewManagerUser;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.Trending;
import org.reviewmanager.pojo.TrendingKeyword;
import org.reviewmanager.service.ReviewService;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.InvoiceCollection;
import com.stripe.model.Subscription;

@Controller
@RequestMapping("/report")
public class ReportController {

	@Autowired
	public ReviewService reviewService;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public ModelAndView indexPage(HttpServletRequest request) {
		return new ModelAndView("views/index");
	}

	@RequestMapping(value = "/addReview", method = RequestMethod.GET)
	public ModelAndView reportDriverPage(HttpServletRequest request) {
		return new ModelAndView("views/reportincident");
	}
	
	
	@RequestMapping(value = "/bulkUpload", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> reportIncident(HttpServletRequest request,
			@RequestParam(name="file",required=false) MultipartFile file) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			
			File tmpFile = new File(System.getProperty("java.io.tmpdir") + System.getProperty("file.separator") + 
                    file.getOriginalFilename());
			file.transferTo(tmpFile);
			List<String> reviews = FileUtils.readLines(tmpFile,"UTF-8");
			for(String review : reviews)
				responseData.putAll(reviewService.addReview(review));
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while adding review");
			responseData.put("success", false);
			reviewService.logError("ReportController","reportIncident",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/reportIncident", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> reportIncident(HttpServletRequest request,
			@RequestBody(required = false) ReviewObject reviewObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String,Object> data= reviewService.addReview(reviewObject);
			if(data!=null)
			{responseData.putAll(data);}
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while adding review");
			responseData.put("success", false);
			reviewService.logError("ReportController","reportIncident",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getReviews", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getReviews(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			String searchText = (String) params.get("searchText");
			Integer pageSize = Integer.parseInt(String.valueOf(params.get("length")));
			Integer activePage = Integer.parseInt(String.valueOf(params.get("activePage")));
			Integer startIndex = Integer.parseInt(String.valueOf(params.get("start")));
			String sortType = params.containsKey("sortBy") ? String.valueOf(params.get("sortBy")) : Strings.EMPTY;

			Map<String, Object> mapData = reviewService.getReviews(RMUtil.getSessionedUser().getUsername(), startIndex,
					pageSize, searchText, sortType);
			List<ReviewObject> data = (List<ReviewObject>) mapData.get("data");
			responseData.put("recordsTotal", Integer.parseInt(mapData.get("count").toString()));
			responseData.put("pageSize", mapData.get("pageSize").toString());
			responseData.put("maxPageSize", mapData.get("maxPageSize").toString());
			responseData.put("activePage", activePage);
			responseData.put("data", data);
			responseData.put("success", data.size() != 0);
		} catch (Exception ex) {
			responseData.put("result", "Error while retrieving reviews");
			responseData.put("success", false);
			reviewService.logError("ReportController","getReviews",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getAccountDetail", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getAccountDetail(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			
			ReviewManagerUser user = (ReviewManagerUser) reviewService
					.getUser("username", RMUtil.getSessionedUser().getUsername()).get("result");
			responseData.put("invoice",reviewService.getInvoiceDetail());
			responseData.put("billing", reviewService.getBillingDetail());
			responseData.put("data", user);
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("result", "Error while getting account detail");
			responseData.put("success", false);
			reviewService.logError("ReportController","getAccountDetail",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getDashboardChartData", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getDashboardChartData(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getDashboardChartData(RMUtil.getSessionedUser().getUsername());
			responseData.put("data", mapData.get("result"));
			responseData.put("pie", mapData.get("pie"));
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("result", "Error while retrieving dashboard data. Please try again.");
			responseData.put("success", false);
			reviewService.logError("ReportController","getDashboardChartData",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getTrendingData", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getTrendingData(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getTrendingData(RMUtil.getSessionedUser().getUsername());
			Trending trending = (Trending) mapData.get("result");
			Collection<TrendingKeyword> data = trending.getTrendingKeywords().values();
			responseData.put("data", data);
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("result", "Error while retrieving trending data. Please try again.");
			responseData.put("success", false);
			reviewService.logError("ReportController","getTrendingData",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getCompetitors", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getCompetitors(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getCompetitors(RMUtil.getSessionedUser().getUsername());
			responseData.put("data", mapData.get("result"));
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while getting competitors");
			responseData.put("success", false);
			reviewService.logError("ReportController","getCompetitors",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/addCompetitor", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addCompetitor(HttpServletRequest request,
			@RequestBody(required = false) BusinessObject businessObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			businessObject.setClientUserName(RMUtil.getSessionedUser().getUsername());
			Map<String, Object> mapData = reviewService.addCompetitor(businessObject);
			responseData.put("success", true);
			responseData.put("result", mapData);
		} catch (Exception ex) {
			responseData.put("error", "Error while adding competitor");
			responseData.put("success", false);
			reviewService.logError("ReportController","addCompetitor",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> updateProfile(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			Map<String, Object> data = reviewService.getUser("username",
					String.valueOf(RMUtil.getSessionedUser().getUsername()));
			String clientID = String.valueOf(data.get("id"));
			ReviewManagerUser user = RMUtil.getSessionedUser();

			// update profile
			if (params.containsKey("accountEmail"))
				user.setClientEmail(params.get("accountEmail").toString());
			if (params.containsKey("accountName"))
				user.setClientName(params.get("accountName").toString());
			if (params.containsKey("businessCity"))
				user.getAddress().setCity(params.get("businessCity").toString());
			if (params.containsKey("businessCountry"))
				user.getAddress().setCountry(params.get("businessCountry").toString());
			if (params.containsKey("businessProvince"))
				user.getAddress().setProvince(params.get("businessProvince").toString());
			if (params.containsKey("businessPostal"))
				user.getAddress().setPostalCode(params.get("businessPostal").toString());
			if (params.containsKey("businessStreet"))
				user.getAddress().setStreetName(params.get("businessStreet").toString());
			if (params.containsKey("businessWebsite"))
				user.setClientBusinessUrl(params.get("businessWebsite").toString());

			// update social {facebookPageUrl=http://www.facebook.com,
			// yelpPageUrl=http://www.yelp.com}
			if (params.containsKey("facebookPageUrl"))
				user.setFacebookUrl(params.get("facebookPageUrl").toString());
			if (params.containsKey("yelpPageUrl"))
				user.setYelpUrl(params.get("yelpPageUrl").toString());

			// update notification
			if (params.containsKey("addedYouAsCompetitorNotify"))
				user.setNotifyAddedAsCompetitor((boolean) params.get("addedYouAsCompetitorNotify"));
			if (params.containsKey("reportNotify"))
				user.setNotifyNewReport((boolean) params.get("reportNotify"));
			if (params.containsKey("reviewNotify"))
				user.setNotifyNewReview((boolean) params.get("reviewNotify"));

			responseData.putAll(reviewService.updateUser(clientID, user));
			responseData.put("success", true);
			responseData.put("result", params);
		} catch (Exception ex) {
			responseData.put("error", "Error while updating profile");
			responseData.put("success", false);
			reviewService.logError("ReportController","updateProfile",ex.getMessage());
		}
		return responseData;
	}
	
	@RequestMapping(value="/changePassword",method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> changePassword(HttpServletRequest request,@RequestBody(required = false) Map<String, Object> params){
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String newPasswordAgain=params.containsKey("newPasswordAgain")?params.get("newPasswordAgain").toString():StringUtils.EMPTY;
			String newPassword=params.containsKey("newPassword")?params.get("newPassword").toString():StringUtils.EMPTY;
			String oldPassword=params.containsKey("oldPassword")?params.get("oldPassword").toString():StringUtils.EMPTY;
			
			if(newPasswordAgain==StringUtils.EMPTY || newPassword==StringUtils.EMPTY || oldPassword==StringUtils.EMPTY || !newPasswordAgain.equalsIgnoreCase(newPassword)){
				throw new Exception("password doesn't match");}
			
			Map<String, Object> mapData = reviewService.changePassword(newPassword,oldPassword);
			responseData.putAll(mapData);
		} catch (Exception ex) {
			responseData.put("result", "Error while changing password");
			responseData.put("success", false);
			reviewService.logError("ReportController","changePassword",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getPerformers", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getPerformers(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getPerformers(RMUtil.getSessionedUser().getUsername());
			responseData.put("data", mapData.get("result"));
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while getting performers");
			responseData.put("success", false);
			reviewService.logError("ReportController","getPerformers",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/addActionItem", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addActionItem(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String reviewId = params.get("reviewId").toString();
			Map<String, Object> mapData = reviewService.addActionItem(reviewId);
			responseData.putAll(mapData);
		} catch (Exception ex) {
			responseData.put("error", "Error while adding action item");
			responseData.put("success", false);
			reviewService.logError("ReportController","addActionItem",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/removeActionItem", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> removeActionItem(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String reviewId = params.get("reviewId").toString();
			Map<String, Object> mapData = reviewService.removeActionItem(reviewId);
			responseData.putAll(mapData);
		} catch (Exception ex) {
			responseData.put("error", "Error while removing action items");
			responseData.put("success", false);
			reviewService.logError("ReportController","removeActionItem",ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getActionItems", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getActionItems(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getActionItem(RMUtil.getSessionedUser().getUsername());
			if (mapData.containsKey("result")) {
				responseData.put("data", mapData.get("result"));
				responseData.put("success", true);
			} else
				responseData.put("success", false);
		} catch (Exception ex) {
			responseData.put("error", ex.getMessage());
			responseData.put("success", false);
		}
		return responseData;
	}

	@PostMapping("/startSubscription")
	public @ResponseBody Map<String, Object> startSubscriptioncharge(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> card) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Stripe.apiKey = "sk_test_VHkhTicB0u0O9eWWlLQVhyuo";
			Customer customer = Customer.retrieve(RMUtil.getSessionedUser().getClientId());
			
			if (customer.getSubscriptions().getData().isEmpty()) {
				Subscription subscription = reviewService.createSubscription();
				responseData.put("subscription_ends", subscription.getTrialEnd());
			}
			
				Subscription sub = reviewService.startSubscription();
				if(sub!=null)
				{
					Map<String, Object> data = reviewService.getUser("username",
							String.valueOf(RMUtil.getSessionedUser().getUsername()));
					String clientID = String.valueOf(data.get("id"));
					RMUtil.getSessionedUser().setSubscription(true);
					responseData.putAll(reviewService.updateUser(clientID, RMUtil.getSessionedUser()));
					responseData.put("result", "Customer subscription re-activated.");
					responseData.put("success", true);
				}
				else
				{
					responseData.put("result", "Error while starting subscription");
					responseData.put("success", false);
				}
			
		} catch (Exception ex) {
			responseData.put("result", "Error while starting subscription");
			responseData.put("success", false);
			reviewService.logError("ReportController","startSubscription",ex.getMessage());
		}
		return responseData;
	}

	@PostMapping("/endSubscription")
	public @ResponseBody Map<String, Object> endSubscriptioncharge(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> card) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Subscription sub = reviewService.cancelSubscription();
			if(sub!=null)
			{
				Map<String, Object> data = reviewService.getUser("username",
						String.valueOf(RMUtil.getSessionedUser().getUsername()));
				String clientID = String.valueOf(data.get("id"));
				RMUtil.getSessionedUser().setSubscription(false);
				responseData.putAll(reviewService.updateUser(clientID, RMUtil.getSessionedUser()));
				responseData.put("result", "Your subscription is cancelled But you can still access the service untill end of your billing period.");
				responseData.put("success", true);
			
			}
		} catch (Exception ex) {
			responseData.put("error","Error while cancelling subscription");
			responseData.put("success", false);
			reviewService.logError("ReportController","endSubscription",ex.getMessage());
		}
		return responseData;
	}

	@PostMapping("/charge")
	public @ResponseBody Map<String, Object> charge(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> card) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String token = card.get("id").toString();
			Customer customer = reviewService.billingInformation(token);
			responseData.put("result", "Your billing information is updated.");
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while updationg billing details");
			responseData.put("success", false);
			reviewService.logError("ReportController","charge",ex.getMessage());
		}
		return responseData;
	}

}
