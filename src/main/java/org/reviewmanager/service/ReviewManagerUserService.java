package org.reviewmanager.service;

import java.util.ArrayList;
import java.util.List;

import org.reviewmanager.interfaces.ReviewServiceInterface;
import org.reviewmanager.users.BusinessUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ReviewManagerUserService.
 */
@Service
public class ReviewManagerUserService implements UserDetailsService {

	/** The user service. */
	@Autowired(required = true)
	@Qualifier(value = "mongo")
	ReviewServiceInterface userService;

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)
	 */
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		BusinessUser user = (BusinessUser) userService.getUser("username", userName.trim().toLowerCase()).get("result");
		return user;
	}
}
