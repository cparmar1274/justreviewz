package org.reviewmanager.service;

import org.reviewmanager.pojo.ReviewManagerUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ReviewManagerUserService implements UserDetailsService {

	@Autowired(required = true)
	ReportIncidentService userService;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		ReviewManagerUser user = (ReviewManagerUser) userService.getUser("username", userName).get("result");
		return user;
	}
}
