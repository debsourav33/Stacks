package com.deb.stack.restfulwebservices.basic.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//@Configuration
//@EnableWebSecurity
public class SpringSecurityConfigureBasicAuth extends WebSecurityConfigurerAdapter{
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {		
		http
		.csrf().disable()
		.headers().frameOptions().disable().and()
		.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
			//.antMatchers(HttpMethod.GET,"/questions").permitAll()
			.anyRequest().authenticated()
			.and()
		.formLogin().and()
		.httpBasic();
		
	}
}
