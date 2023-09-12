package com.deb.stacks.questionsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuestionsServiceApplication {

	//Running this initiates a component scanning mechanism to find and register various components, including @RestController classes.
	public static void main(String[] args) {
		SpringApplication.run(QuestionsServiceApplication.class, args);
	}

}
