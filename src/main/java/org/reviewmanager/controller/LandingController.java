package org.reviewmanager.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.bson.internal.Base64;
import org.reviewmanager.pojo.EmailNotificationObject;
import org.reviewmanager.pojo.ProductObject;
import org.reviewmanager.pojo.PromotionCounterObject;
import org.reviewmanager.pojo.PromotionObject;
import org.reviewmanager.pojo.QueryObject;
import org.reviewmanager.pojo.ReviewObject;
import org.reviewmanager.pojo.SearchBusinessObject;
import org.reviewmanager.service.RMEmailService;
import org.reviewmanager.service.RMRecentService;
import org.reviewmanager.service.ReviewService;
import org.reviewmanager.users.BusinessUser;
import org.reviewmanager.users.BusinessUserTemp;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import io.netty.util.internal.StringUtil;

// TODO: Auto-generated Javadoc
/**
 * The Class PublicController.
 */
@Controller
@RequestMapping({ "/", "/landing" })
public class LandingController {

	/** The review service. */
	@Autowired
	public ReviewService reviewService;

	/** The email service. */
	@Autowired
	public RMEmailService emailService;

	/** The recent service. */
	@Autowired
	public RMRecentService recentService;

	/** The Constant PUBLIC_ID. */
	public static final String PUBLIC_ID = "101";

	public LandingController() {
		super();
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	@RequestMapping(value = "/")
	public ModelAndView publics(HttpServletRequest request) {
		return new ModelAndView("redirect:/landing/public");
	}

	/**
	 * Review auth.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the model and view
	 */
	@RequestMapping(value = "/login")
	public ModelAndView reviewAuth(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		ModelAndView landingView = new ModelAndView("views/login");
		landingView.addObject("error", params.containsKey("error") ? "Invalid Username/Password.Please review." : "");
		landingView.addObject("logout", params.containsKey("logout") ? "You have been logged out successfully." : "");
		return landingView;
	}

	/**
	 * Logout page.
	 *
	 * @param request
	 *            the request
	 * @param response
	 *            the response
	 * @return the model and view
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ModelAndView logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return new ModelAndView("redirect:/login?logout");
	}

	/**
	 * Forgot password.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/forgotPassword", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> forgotPassword(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			Map<String, Object> clientData = reviewService.resetPassword(params.get("clientEmail").toString());
			if (clientData.get("result") != null) {
				responseData.putAll(clientData);
			} else {
				responseData.put("result", "User does not exists.");
			}

		} catch (Exception ex) {
			responseData.put("result", "Error while resetting password. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Adds the user.
	 *
	 * @param request
	 *            the request
	 * @param newUserRequest
	 *            the new user request
	 * @return the map
	 */
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUser(HttpServletRequest request,
			@RequestBody(required = false) BusinessUserTemp newUserRequest) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			Map<String, Object> clientData = reviewService.getUser("username", newUserRequest.getUsername());
			if (clientData.get("result") == null) {
				// Customer customer =
				// reviewService.createStripeUser(newUserRequest);
				// newUserRequest.setClientId(reviewService.getTotalCustomers());

				if (StringUtil.isNullOrEmpty(newUserRequest.getPassword())) {
					newUserRequest.setPassword(RMUtil.generateRandomPasswordText());
				}
				responseData.putAll(reviewService.addUser(newUserRequest));
			} else {
				responseData.put("clientID", clientData.get("id"));
				responseData.put("result", "User already exists.");
				responseData.put("success", false);
			}
		} catch (Exception ex) {
			responseData.put("result", "Error while creating user.");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReviewManager", "addUser", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Publiclanding.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the model and view
	 */
	@RequestMapping(value = "/public")
	public ModelAndView publiclanding(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		return new ModelAndView("views/publicsite");

	}

	/**
	 * Gets the client information.
	 *
	 * @param request
	 *            the request
	 * @param response
	 *            the response
	 * @param params
	 *            the params
	 * @return the client information
	 */
	@RequestMapping(value = "/getClient", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getClientInformation(HttpServletRequest request,
			HttpServletResponse response, @RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String type = String.valueOf(params.get("type"));
			Map<String, Object> data = new HashMap<>();

			if (type == null || !type.equalsIgnoreCase("PRODUCT")) {
				data = reviewService.getUser("clientId", String.valueOf(params.get("clientId")));
				BusinessUser user = (BusinessUser) data.get("result");

				responseData.put("token", RMUtil.MAPBOX_KEY);
				responseData.put("clientName", user.getClientName());
				responseData.put("clientBusinessUrl", user.getClientBusinessUrl());
				responseData.put("clientType", user.getClientType());
				responseData.put("address",
						user.getAddress().getStreetName() + ' ' + user.getAddress().getCity() + ' '
								+ user.getAddress().getProvince() + ' ' + user.getAddress().getPostalCode() + ' '
								+ user.getAddress().getCountry());
				responseData.put("workingHours", user.getWorkingHours());
				responseData.put("openToday", RMUtil.isOpenToday(user.getWorkingHours()));
				responseData.put("clientBusinessWebsite", user.getClientBusinessUrl());
				responseData.put("clientBusinessFacebook", user.getFacebookUrl());
				responseData.put("clientBusinessPhoneNumber", user.getClientBusinessPhoneNumber());

				// set cookies
				Cookie userCookie = new Cookie("__rwzWL", Base64.encode(user.getAddress().getCity().getBytes()));
				userCookie.setMaxAge(60 * 60 * 24 * 365);
				response.addCookie(userCookie);
			} else {
				ProductObject product = reviewService.getProductById(String.valueOf(params.get("clientId")));
				responseData.put("clientName", product.getProductName());
				responseData.put("product", product);
			}

		} catch (Exception ex) {
			responseData.put("result", "Error while retrieving client detail.");
			responseData.put("errorMessage", ex.getMessage());
			responseData.put("success", false);
			reviewService.logError("ReviewManager", "getClientInformation", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Post review.
	 *
	 * @param request
	 *            the request
	 * @param response
	 *            the response
	 * @param reviewObject
	 *            the review object
	 * @return the map
	 */
	@RequestMapping(value = "/postReview", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> postReview(HttpServletRequest request, HttpServletResponse response,
			@RequestBody(required = false) ReviewObject reviewObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			reviewObject.setPublicId(PUBLIC_ID);
			reviewObject.setReviewDate(new Date());
			reviewObject.setClientId(reviewObject.getClientId());
			reviewObject.setReviewDate(new Date());

			if (reviewObject.getType() == null || !reviewObject.getType().equalsIgnoreCase("PRODUCT")) {
				Map<String, Object> data = reviewService.getUser("clientId", reviewObject.getClientId());
				BusinessUser user = (BusinessUser) data.get("result");
				reviewObject.setBusinessName(user.getClientName());
				reviewObject.setBusinessAddress(user.getAddress().getCity() + "," + user.getAddress().getProvince()
						+ " " + user.getAddress().getCountry());
			} else {
				ProductObject product = reviewService.getProductById(reviewObject.getClientId());
				reviewObject.setBusinessName(product.getProductName());
				reviewObject.setBusinessAddress(product.getProductDetail());
			}

			responseData.put("result", reviewService.addPublicReview(reviewObject));

			// set cookies
			Cookie userCookie = new Cookie("__rwzWb", Base64.encode(reviewObject.getPostedBy().getBytes()));
			Cookie emailCookie = new Cookie("__rwzWe", Base64.encode(reviewObject.getPostedEmail().getBytes()));
			userCookie.setMaxAge(60 * 60 * 24 * 365);
			emailCookie.setMaxAge(60 * 60 * 24 * 365);
			response.addCookie(userCookie);
			response.addCookie(emailCookie);

			emailService.sendEmailNotification(new EmailNotificationObject(reviewObject.getPostedEmail(),
					reviewObject.getPostedBy(), "Review has been posted.",
					"Your review has been posted successfully.<br><br><i>" + reviewObject.getReviewText() + "</i>",
					reviewObject.getClientId()));

		} catch (Exception ex) {
			ex.printStackTrace();
			responseData.put("result", "Error while posting review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Post ask.
	 *
	 * @param request
	 *            the request
	 * @param response
	 *            the response
	 * @param queryObject
	 *            the query object
	 * @return the map
	 */
	@RequestMapping(value = "/postAsk", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> postAsk(HttpServletRequest request, HttpServletResponse response,
			@RequestBody(required = false) QueryObject queryObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			queryObject.setPostedDate(new Date());
			responseData.put("result", reviewService.addPublicQuery(queryObject));

			// set cookies
			Cookie userCookie = new Cookie("__rwzWb", Base64.encode(queryObject.getPostedBy().getBytes()));
			Cookie emailCookie = new Cookie("__rwzWe", Base64.encode(queryObject.getPostedEmail().getBytes()));
			userCookie.setMaxAge(60 * 60 * 24 * 365);
			emailCookie.setMaxAge(60 * 60 * 24 * 365);
			response.addCookie(userCookie);
			response.addCookie(emailCookie);

		} catch (Exception ex) {
			responseData.put("result", "Error while submitting query. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the ask.
	 *
	 * @param request
	 *            the request
	 * @param queryObject
	 *            the query object
	 * @return the ask
	 */
	@RequestMapping(value = "/getAsk", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getAsk(HttpServletRequest request,
			@RequestBody(required = false) QueryObject queryObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("result", reviewService.getPublicQuery(queryObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while getting query. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Gets the promotion.
	 *
	 * @param request
	 *            the request
	 * @param promotionObject
	 *            the promotion object
	 * @return the promotion
	 */
	@RequestMapping(value = "/getPromotion", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getPromotion(HttpServletRequest request,
			@RequestBody(required = false) PromotionObject promotionObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("result", reviewService.getPromotion(promotionObject, true));
		} catch (Exception ex) {
			responseData.put("result", "Error while getting query. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Request promotion.
	 *
	 * @param request
	 *            the request
	 * @param promotionCounterObject
	 *            the promotion counter object
	 * @return the map
	 */
	@RequestMapping(value = "/requestPromotion", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> requestPromotion(HttpServletRequest request,
			@RequestBody(required = false) PromotionCounterObject promotionCounterObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("result", reviewService.requestPromotion(promotionCounterObject, false));
		} catch (Exception ex) {
			responseData.put("result", "Error while getting query. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Load data.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
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
			ReviewObject publicReview = reviewService.getReviewById(String.valueOf(params.get("reviewText")));
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
	 * Like comment.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/likeComment", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> likeComment(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			Integer reviewID = Integer.valueOf(params.get("reviewId").toString());
			Integer likeFlag = Integer.valueOf(params.get("reviewFlag").toString());
			// likeFlag = 0 for incr , 1 for decr
			responseData.put("result", reviewService.likeComment(reviewID, likeFlag));

		} catch (Exception ex) {
			responseData.put("result", "Error while liking review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Dislike comment.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/dislikeComment", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> dislikeComment(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			Integer reviewID = Integer.valueOf(params.get("reviewId").toString());
			Integer likeFlag = Integer.valueOf(params.get("reviewFlag").toString());
			// likeFlag = 0 for incr , 1 for decr
			responseData.put("result", reviewService.dislikeComment(reviewID, likeFlag));

		} catch (Exception ex) {
			responseData.put("result", "Error while disliking review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Load review.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/loadReview", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> loadReview(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			ReviewObject reviewClient = new ReviewObject();
			reviewClient.setClientId(String.valueOf(params.get("clientId")));
			String sortingOrder = String.valueOf(params.get("sortingOrder"));
			responseData.put("result", reviewService.getPublicReviews(reviewClient, sortingOrder));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading review. please try again after sometime.");
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
	 * Subscribe.
	 *
	 * @param request
	 *            the request
	 * @param params
	 *            the params
	 * @return the map
	 */
	@RequestMapping(value = "/subscribe", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> subscribe(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			String clientId = String.valueOf(params.get("clientId"));
			String email = String.valueOf(params.get("email"));
			String clientName = String.valueOf(params.get("clientName"));
			String address = String.valueOf(params.get("address"));
			emailService.sendEmailNotification(new EmailNotificationObject(email, "", "SUBSCRIBE",
					"You have successfully subscribed to updates from " + clientName + " located at " + address + ".",
					clientId));

			responseData.put("result", reviewService.addClientCustomer(clientId, email));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	/**
	 * Unsubscribe.
	 *
	 * @param request
	 *            the request
	 * @param clientId
	 *            the client id
	 * @param email
	 *            the email
	 * @return the map
	 */
	@RequestMapping(value = "/unsubscribe", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> unsubscribe(HttpServletRequest request,
			@RequestParam("clientId") String clientId, @RequestParam("email") String email) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			emailService.sendEmailNotification(new EmailNotificationObject(email, "", "UNSUBSCRIBE",
					"You have successfully unsubscribed from Just Reviewz.", clientId));
			responseData.put("result", reviewService.removeClientCustomer(clientId, email));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/latestEvents", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> latestEvents(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("reviews", recentService.getLatestReviews());
			responseData.put("queries", recentService.getLatestQueries());
			responseData.put("promotions", recentService.getLatestPromotions());
		} catch (Exception ex) {
			responseData.put("result", "Error while loading review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/registerNewBusiness", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> registerNewBusiness(HttpServletRequest request,
			@RequestBody(required = false) SearchBusinessObject searchBusinessObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("result", reviewService.registerNewBusiness(searchBusinessObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while loading review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	@PostMapping(value = "/postProduct")
	public @ResponseBody Map<String, Object> postProduct(HttpServletRequest request, HttpServletResponse response,
			@RequestBody(required = false) ProductObject productObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			responseData.put("result", reviewService.postProduct(productObject));
		} catch (Exception ex) {
			responseData.put("result", "Error while creating product. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

	@RequestMapping(value = "/getProduct", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> getProduct(HttpServletRequest request, HttpServletResponse response,
			@RequestBody(required = false) ProductObject productObject) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {
			if (StringUtils.isEmpty(productObject.getProductId())) {
				responseData.put("result", reviewService.getProduct(productObject));
				responseData.put("action", "search");
			} else {
				responseData.put("result", reviewService.getProductById(productObject.getProductId()));
				responseData.put("action", "ID");
			}

		} catch (Exception ex) {
			responseData.put("result", "Error while creating product. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}

}
