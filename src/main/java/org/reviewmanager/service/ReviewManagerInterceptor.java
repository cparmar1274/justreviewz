package org.reviewmanager.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.reviewmanager.pojo.ReviewManagerUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class ReviewManagerInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Prehandle" + auth);
		if (!(auth.getPrincipal() instanceof ReviewManagerUser)) {
			response.sendRedirect("login");
			return false;
		}
		return super.preHandle(request, response, handler);
	}

}
