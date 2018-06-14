package org.reviewmanager.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.reviewmanager.service.ReviewService;
import org.reviewmanager.utility.RMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/home")
public class HomeController {

	@Autowired
	public ReviewService reviewService;

	@RequestMapping(value = { "/", "/dashboard" })
	public ModelAndView reviewDashboard(HttpServletRequest request) {
		ModelAndView landingView = new ModelAndView("views/dashboard");
		landingView.addObject("currentYear", "Jan 2018");
		landingView.addObject("clientName", "SIT Automation");
		try {
			landingView.addObject("clientType", RMUtil.getSessionedUser().getClientType());
		} catch (Exception ex) {
			landingView.addObject("clientType", "Unknown");
		}
		return landingView;
	}

	@RequestMapping(value = "/landing")
	public ModelAndView reviewLanding(HttpServletRequest request) {
		ModelAndView landingView = new ModelAndView("views/landing");
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

}
