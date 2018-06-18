package org.reviewmanager.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.reviewmanager.pojo.ReviewManagerNewUser;
import org.reviewmanager.pojo.ReviewManagerUser;
import org.reviewmanager.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.stripe.Stripe;
import com.stripe.model.Customer;

@Controller
public class ReviewManager {

	@Autowired(required = true)
	ReviewService reviewService;

	@RequestMapping(value = "/")
	public String reviewDashboardOld(HttpServletRequest request) {
		return "redirect:/report/index";
	}

	@RequestMapping(value = "/requestOnboarding")
	public ModelAndView requestOnboarding(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		ModelAndView landingView = new ModelAndView("views/newaccount");
		landingView.addObject("error", params.get("error"));
		landingView.addObject("logout", params.get("logout"));
		return landingView;
	}

	@RequestMapping(value = "/login")
	public ModelAndView reviewAuth(HttpServletRequest request,
			@RequestParam(required = false) Map<String, Object> params) {
		ModelAndView landingView = new ModelAndView("views/login");
		landingView.addObject("error", params.containsKey("error") ? "Invalid Username/Password.Please review." : "");
		landingView.addObject("logout", params.containsKey("logout") ? "You have been logged out successfully." : "");
		return landingView;
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ModelAndView logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return new ModelAndView("redirect:/login?logout");
	}

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
		}
		return responseData;
	}

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> addUser(HttpServletRequest request,
			@RequestBody(required = false) ReviewManagerNewUser newUserRequest) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			Map<String, Object> clientData = reviewService.getUser("clientEmail", newUserRequest.getClientEmail());
			if (clientData.get("result") == null) {
				Customer customer = reviewService.createStripeUser(newUserRequest.getClientEmail());
				newUserRequest.setClientId(customer.getId());
				responseData.put("data", reviewService.addUser(newUserRequest));
			} else {
				responseData.put("data", "User already exists.");
			}
		} catch (Exception ex) {
			responseData.put("error", "Error while creating user.");
			responseData.put("success", false);
			reviewService.logError("ReviewManager", "addUser", ex.getMessage());
		}
		return responseData;
	}

}
