package org.reviewmanager.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

// TODO: Auto-generated Javadoc
/**
 * The Class HomeController.
 *
 * @author Chirag Parmar { support@justreviewz.com | Developed for Just Reviewz Inc.}
 */
@Controller
@RequestMapping(value = "/home")
public class HomeController {
	
	
	
	public HomeController() {
		super();
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	
	@GetMapping(value = "/logout")
	public ModelAndView logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return new ModelAndView("redirect:/login?logout");
	}
	

	@RequestMapping(value = "/loginerror", method = RequestMethod.GET)
	public ModelAndView loginerrorPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return new ModelAndView("redirect:/login?error");
	}
	
	@RequestMapping(value = "/loadResults", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> getloadData(HttpServletRequest request,
			@RequestBody(required = false) Map<String, Object> params) {
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			String query = params.get("query").toString().toLowerCase();
			String type = params.get("type").toString().toLowerCase().equalsIgnoreCase("business") ? "BUSINESS"
					: "LOCATION";
			String businessName = params.get("businessName").toString().toLowerCase();
			String locationName = params.get("locationName").toString().toLowerCase();

			
		} catch (Exception ex) {
			responseData.put("result", "Error while posting review. please try again after sometime.");
			responseData.put("errorMessage", ex.getMessage());
		}
		return responseData;
	}
}
