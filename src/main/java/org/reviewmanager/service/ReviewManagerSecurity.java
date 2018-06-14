package org.reviewmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
@EnableWebSecurity
public class ReviewManagerSecurity extends WebSecurityConfigurerAdapter {

	@Autowired
	ReviewManagerUserService reviewManagerUserService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.authorizeRequests().antMatchers("/report/**").authenticated().and().formLogin().loginPage("/login")
				.failureUrl("/login?error").permitAll().usernameParameter("username").passwordParameter("password")
				.and().rememberMe().userDetailsService(reviewManagerUserService).rememberMeParameter("remember-me")
				.and().logout().logoutUrl("/home/logout").logoutSuccessUrl("/login?logout").invalidateHttpSession(true)
				.deleteCookies("JSESSIONID").permitAll().and().exceptionHandling().accessDeniedPage("/access_denied")
				.and().csrf().disable();

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
		http.sessionManagement().maximumSessions(1).sessionRegistry(sessionRegistry());
		http.sessionManagement().invalidSessionUrl("/login?error");
		http.sessionManagement().sessionFixation().migrateSession();
	}

	@Bean
	public SessionRegistry sessionRegistry() {
		return new SessionRegistryImpl();
	}

	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(reviewManagerUserService);
		auth.authenticationProvider(authenticationProvider());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(reviewManagerUserService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver createMultipartResolver() {
		CommonsMultipartResolver blueprintCommonsMultipartResolver = new CommonsMultipartResolver();
		blueprintCommonsMultipartResolver.setMaxUploadSize(1000000);
		return blueprintCommonsMultipartResolver;
	}

}
