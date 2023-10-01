package com.deb.stacks.questionsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class QuestionsServiceApplication {

	//since this is the starting component, the bean will be inited
	//and supplied to every autowired RestTemplate variable
	@Bean
	public RestTemplate getRestTemplate(){
		return new RestTemplate();
	}

	//Running this initiates a component scanning mechanism to find and register various components, including @RestController classes.
	public static void main(String[] args) {
		SpringApplication.run(QuestionsServiceApplication.class, args);
	}

}
