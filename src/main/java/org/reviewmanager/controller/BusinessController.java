package org.reviewmanager.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.reviewmanager.pojo.BusinessObject;
import org.reviewmanager.pojo.EmailNotificationObject;
import org.reviewmanager.pojo.Notification;
import org.reviewmanager.pojo.PromotionCounterObject;
import org.reviewmanager.pojo.PromotionObject;
import org.reviewmanager.pojo.QueryObject;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.Trending;
import org.reviewmanager.pojo.TrendingKeyword;
import org.reviewmanager.pojo.WorkingHours;
import org.reviewmanager.service.ReviewNotificationService;
import org.reviewmanager.service.ReviewService;
import org.reviewmanager.users.BusinessUser;
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

import com.stripe.model.Customer;
import com.stripe.model.Subscription;

// TODO: Auto-generated Javadoc
/**
 * The Class ReportController.
 */
@Controller
@RequestMapping("/business")
public class BusinessController {

	/** The review service. */
	@Autowired
	public ReviewService reviewService;

	/** The notification service. */
	@Autowired
	public ReviewNotificationService notificationService;

	public BusinessController() {
		super();
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	/**
	 * Index page.
	 *
	 * @param request
	 *            the request
	 * @return the model and view
	 */
	@RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
	public ModelAndView indexPage(HttpServletRequest request) {
		return new ModelAndView("views/index");
	}

	/**
	 * Report driver page.
	 *
	 * @param request
	 *            the request
	 * @return the model and view
	 */
	@RequestMapping(value = "/addReview", method = RequestMethod.GET)
	public ModelAndView reportDriverPage(HttpServletRequest request) {
		return new ModelAndView("views/reportincident");
	}

	/**
	 * Report incident.
	 *
	 * @param request
	 *            the request
	 * @param file
	 *            the file
	 * @return the map
	 */
	@RequestMapping(value = "/bulkUpload", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> reportIncident(HttpServletRequest request,
			@RequestParam(name = "file", required = false) MultipartFile file) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			File tmpFile = new File(System.getProperty("java.io.tmpdir") + System.getProperty("file.separator")
					+ file.getOriginalFilename());
			file.transferTo(tmpFile);

			FileInputStream excelFile = new FileInputStream(tmpFile);
			Workbook workbook = new XSSFWorkbook(excelFile);
			Sheet datatypeSheet = workbook.getSheetAt(0);
			Iterator<Row> iterator = datatypeSheet.iterator();
			int rowCount = 0;
			while (iterator.hasNext()) {
				if (rowCount == 0)
					iterator.next();
				Row currentRow = iterator.next();
				Iterator<Cell> cellIterator = currentRow.iterator();

				String cellString = StringUtils.EMPTY;
				while (cellIterator.hasNext()) {
					Cell currentCell = cellIterator.next();
					cellString += currentCell.toString() + RMUtil.REVIEW_STRING_SPLITTER;

				}
				responseData.putAll(reviewService.addReview(cellString));
				rowCount++;
			}

			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while adding review");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "reportIncident", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Report incident.
	 *
	 * @param request
	 *            the request
	 * @param reviewObject
	 *            the review object
	 * @return the map
	 */
	@RequestMapping(value = "/reportIncident", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> reportIncident(HttpServletRequest request,
			@RequestBody(required = false) ReviewObject reviewObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> data = reviewService.addReview(reviewObject);
			if (data != null) {
				responseData.putAll(data);
			}
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while adding review");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "reportIncident", ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getAsk", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getAsk(HttpServletRequest request,
			@RequestBody(required = false) QueryObject queryObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			queryObject.setClientId(RMUtil.getSessionedUser().getClientId());
			responseData.put("result", reviewService.getPublicQuery(queryObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while getting query. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the reviews.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the reviews
	 */
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

			Map<String, Object> mapData = reviewService.getReviews(RMUtil.getSessionedUser().getClientId(), startIndex,
					pageSize, searchText, sortType);
			List<ReviewObject> data = (List<ReviewObject>) mapData.get("data");
			responseData.put("recordsTotal", Integer.parseInt(mapData.get("count").toString()));
			responseData.put("pageSize", mapData.get("pageSize").toString());
			responseData.put("maxPageSize", mapData.get("maxPageSize").toString());
			responseData.put("activePage", activePage);
			responseData.put("data", data);
			responseData.put("success", data.size() != 0);
		} catch (Exception ex) {
			ex.printStackTrace();
			responseData.put("result", "Error while retrieving reviews");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "getReviews", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the account detail.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the account detail
	 */
	@RequestMapping(value = "/getAccountDetail", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getAccountDetail(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			BusinessUser user = (BusinessUser) reviewService
					.getUser("clientId", RMUtil.getSessionedUser().getClientId()).get("result");
			responseData.put("invoice", reviewService.getInvoiceDetail());
			responseData.put("billing", reviewService.getBillingDetail());
			user.setSubscription(reviewService.getSubscriptionStatus());
			responseData.put("data", user);
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("result", "Error while getting account detail");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "getAccountDetail", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the dashboard chart data.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the dashboard chart data
	 */
	@RequestMapping(value = "/getDashboardChartData", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getDashboardChartData(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getDashboardChartData(RMUtil.getSessionedUser().getClientId());
			responseData.put("data", mapData.get("result"));
			responseData.putAll(mapData);
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("result", "Error while retrieving dashboard data. Please try again.");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "getDashboardChartData", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the trending data.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the trending data
	 */
	@RequestMapping(value = "/getTrendingData", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getTrendingData(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getTrendingData(RMUtil.getSessionedUser().getClientId());
			Trending trending = (Trending) mapData.get("result");
			Collection<TrendingKeyword> data = trending.getTrendingKeywords().values();
			responseData.put("data", data);
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("result", "Error while retrieving trending data. Please try again.");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "getTrendingData", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the competitors.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the competitors
	 */
	@RequestMapping(value = "/getCompetitors", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getCompetitors(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getCompetitors(RMUtil.getSessionedUser().getClientId());
			responseData.put("data", mapData.get("result"));
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while getting competitors");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "getCompetitors", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Adds the competitor.
	 *
	 * @param request
	 *            the request
	 * @param businessObject
	 *            the business object
	 * @return the map
	 */
	@RequestMapping(value = "/addCompetitor", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addCompetitor(HttpServletRequest request,
			@RequestBody(required = false) BusinessObject businessObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			businessObject.setClientId(RMUtil.getSessionedUser().getClientId());
			Map<String, Object> mapData = reviewService.addCompetitor(businessObject);
			responseData.put("success", true);
			responseData.put("result", mapData);
		} catch (Exception ex) {
			responseData.put("error", "Error while adding competitor");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "addCompetitor", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Update profile.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> updateProfile(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			Map<String, Object> data = reviewService.getUser("clientId",
					String.valueOf(RMUtil.getSessionedUser().getClientId()));
			String clientID = String.valueOf(data.get("id"));
			BusinessUser user = (BusinessUser) data.get("result");

			// update profile
			if (params.containsKey("accountEmail")) {
				user.setClientEmail(params.get("accountEmail").toString());
				RMUtil.getSessionedUser().setClientEmail(user.getClientEmail());
			}
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

			if (params.containsKey("workingHours"))
				user.setWorkingHours(
						RMUtil.gson.fromJson(RMUtil.gson.toJson(params.get("workingHours")), WorkingHours.class));

			if (params.containsKey("clientBusinessPhoneNumber"))
				user.setClientBusinessPhoneNumber(params.get("clientBusinessPhoneNumber").toString());

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
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "updateProfile", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Change password.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/changePassword", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> changePassword(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String newPasswordAgain = params.containsKey("newPasswordAgain") ? params.get("newPasswordAgain").toString()
					: StringUtils.EMPTY;
			String newPassword = params.containsKey("newPassword") ? params.get("newPassword").toString()
					: StringUtils.EMPTY;
			String oldPassword = params.containsKey("oldPassword") ? params.get("oldPassword").toString()
					: StringUtils.EMPTY;

			if (newPasswordAgain == StringUtils.EMPTY || newPassword == StringUtils.EMPTY
					|| oldPassword == StringUtils.EMPTY || !newPasswordAgain.equalsIgnoreCase(newPassword)) {
				throw new Exception("password doesn't match");
			}

			Map<String, Object> mapData = reviewService.changePassword(newPassword, oldPassword);
			responseData.putAll(mapData);
		} catch (Exception ex) {
			responseData.put("result", "Error while changing password");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "changePassword", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the performers.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the performers
	 */
	@RequestMapping(value = "/getPerformers", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getPerformers(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getPerformers(RMUtil.getSessionedUser().getClientId());
			responseData.put("data", mapData.get("result"));
			responseData.put("success", true);
		} catch (Exception ex) {
			responseData.put("error", "Error while getting performers");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "getPerformers", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Adds the action item.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
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
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "addActionItem", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Removes the action item.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
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
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "removeActionItem", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the action items.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the action items
	 */
	@RequestMapping(value = "/getActionItems", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getActionItems(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Map<String, Object> mapData = reviewService.getActionItem(RMUtil.getSessionedUser().getClientId());
			if (mapData.containsKey("result")) {
				responseData.put("data", mapData.get("result"));
				responseData.put("success", true);
			} else
				responseData.put("success", false);
		} catch (Exception ex) {
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
		}
		return responseData;
	}

	/**
	 * Gets the notifications.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the notifications
	 */
	@RequestMapping(value = "/getNotifications", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getNotifications(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			List<Notification> notficiatoins = notificationService
					.getNotificatoin(RMUtil.getSessionedUser().getClientId());
			if (notficiatoins != null && !notficiatoins.isEmpty()) {
				responseData.put("data", notficiatoins);
				responseData.put("success", true);
			} else
				responseData.put("success", false);
		} catch (Exception ex) {
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
		}
		return responseData;
	}

	/**
	 * Mark notification.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/markNotification", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> markNotification(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String notificationId = params.get("notificationID").toString();
			Map<String, Object> notficiatoins = notificationService.markAsRead(notificationId);
			if (notficiatoins != null) {
				responseData.put("data", notficiatoins);
				responseData.put("success", true);
			} else
				responseData.put("success", false);
		} catch (Exception ex) {
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
		}
		return responseData;
	}

	/**
	 * Start subscriptioncharge.
	 *
	 * @param request
	 *            the request
	 * @param card
	 *            the card
	 * @return the map
	 */
	@PostMapping("/startSubscription")
	public @ResponseBody Map<String, Object> startSubscriptioncharge(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> card) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			if (!StringUtils.isEmpty(RMUtil.getSessionedUser().getClientEmail())) {
				Customer customer = reviewService.createStripeUser(RMUtil.getSessionedUser());
				if (customer.getSubscriptions().getData().isEmpty()) {
					Subscription subscription = reviewService.createSubscription();
					responseData.put("subscription_ends", subscription.getTrialEnd());
				}

				Subscription sub = reviewService.startSubscription();
				if (sub != null) {
					BusinessUser user = RMUtil.getSessionedUser();
					user.setSubscription(true);
					responseData.putAll(reviewService.updateUser(user.getClientId(), user));
					responseData.put("result", "Customer subscription re-activated.");
					responseData.put("success", true);
				} else {
					responseData.put("result", "Error while starting subscription");
					responseData.put("success", false);
				}
			} else {
				responseData.put("result", "Please provide your email id and confirm it.");
				responseData.put("success", false);
			}

		} catch (Exception ex) {
			responseData.put("result", "Error while starting subscription");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "startSubscription", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * End subscriptioncharge.
	 *
	 * @param request
	 *            the request
	 * @param card
	 *            the card
	 * @return the map
	 */
	@PostMapping("/endSubscription")
	public @ResponseBody Map<String, Object> endSubscriptioncharge(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> card) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			Subscription sub = reviewService.cancelSubscription();
			if (sub != null) {
				Map<String, Object> data = reviewService.getUser("clientId",
						String.valueOf(RMUtil.getSessionedUser().getClientId()));
				String clientID = String.valueOf(data.get("id"));
				BusinessUser user = (BusinessUser) data.get("result");
				user.setSubscription(false);
				responseData.putAll(reviewService.updateUser(clientID, user));
				responseData.put("result",
						"Your subscription is cancelled But you can still access the service untill end of your billing period.");
				responseData.put("success", true);
			}
		} catch (Exception ex) {
			responseData.put("error", "Error while cancelling subscription");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "endSubscription", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Charge.
	 *
	 * @param request
	 *            the request
	 * @param card
	 *            the card
	 * @return the map
	 */
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
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReportController", "charge", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Reply review.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/replyReview", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> replyReview(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			// add review for client
			ReviewObject publicReview = reviewService.getReviewById(String.valueOf(params.get("replyTo")));
			publicReview.setReplyText(String.valueOf(params.get("reviewText")));
			publicReview.setReplyDate(new Date());
			responseData.put("result", reviewService.addPublicReview(publicReview));

		} catch (Exception ex) {
			responseData.put("result", "Error while posting review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Reply ask.
	 *
	 * @param request
	 *            the request
	 * @param queryObject
	 *            the query object
	 * @return the map
	 */
	@RequestMapping(value = "/replyAsk", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> replyAsk(HttpServletRequest request,
			@RequestBody(required = false) QueryObject queryObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			queryObject.setClientId(RMUtil.getSessionedUser().getClientId());
			queryObject.setPostedDate(new Date());
			responseData.put("result", reviewService.addPublicQuery(queryObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while getting query. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Load replies.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/loadReplies", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> loadReplies(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			ReviewObject publicReview = new ReviewObject();
			publicReview.setReviewId(String.valueOf(params.get("reviewId")));

			responseData.put("result", reviewService.getPublicReplies(publicReview));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Load business.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/loadBusiness", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> loadBusiness(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("result", reviewService.getBusinessCustomers(RMUtil.getSessionedUser().getClientId()));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading business. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Load promotions.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/loadPromotions", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> loadPromotions(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			PromotionObject promotionObject = new PromotionObject();
			promotionObject.setClientId(RMUtil.getSessionedUser().getClientId());
			responseData.put("result", reviewService.getPromotion(promotionObject, false));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading promotion. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Reset promotion counter.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/resetPromotionCounter", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> resetPromotionCounter(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			PromotionCounterObject promotionObject = new PromotionCounterObject();
			promotionObject.setClientId(RMUtil.getSessionedUser().getClientId());
			promotionObject.setPromotionRequestCounter(-1);
			responseData.put("result", reviewService.requestPromotion(promotionObject, true));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading promotion. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the promotion counter.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the promotion counter
	 */
	@RequestMapping(value = "/getPromotionCounter", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getPromotionCounter(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			PromotionCounterObject promotionObject = new PromotionCounterObject();
			promotionObject.setClientId(RMUtil.getSessionedUser().getClientId());
			responseData.put("result", reviewService.getPromotionCounter(promotionObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading promotion. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Load promotions.
	 *
	 * @param request
	 *            the request
	 * @param promotionObject
	 *            the promotion object
	 * @return the map
	 */
	@RequestMapping(value = "/createPromotion", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> loadPromotions(HttpServletRequest request,
			@RequestBody(required = false) PromotionObject promotionObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			promotionObject.setBusinessName(RMUtil.getSessionedUser().getClientName());
			promotionObject.setBusinessAddress(RMUtil.getSessionedUser().getAddress().getCity() + " ,"
					+ RMUtil.getSessionedUser().getAddress().getProvince() + " "
					+ RMUtil.getSessionedUser().getAddress().getCountry());
			promotionObject.setClientId(RMUtil.getSessionedUser().getClientId());
			responseData.put("result", reviewService.addPromotion(promotionObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while creating promotion. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/sendDiscount", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> sendDiscount(HttpServletRequest request,
			@RequestBody(required = false) EmailNotificationObject emailObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("result", reviewService.sendDiscount(emailObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while posting review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/loadResults", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> loadData(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			String query = params.get("query").toString().toLowerCase();
			String type = params.get("type").toString().toLowerCase().equalsIgnoreCase("business") ? "BUSINESS"
					: "LOCATION";
			String businessName = params.get("businessName").toString().toLowerCase();
			String locationName = params.get("locationName").toString().toLowerCase();

			responseData.put("result",
					type.equalsIgnoreCase("BUSINESS") ? reviewService.searchBusiness(businessName, locationName)
							: reviewService.searchLocation(query, type));
		} catch (Exception ex) {
			responseData.put("result", "Error while posting review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

}
