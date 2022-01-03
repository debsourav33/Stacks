package com.deb.stack.restfulwebservices.heapoverflow;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HeapOverFlowController {
	
	@Autowired
	QuestionService questionService;
	
	@GetMapping("/questions")
	public List<Question> getAllQuestions() {
		return questionService.retrieveAllQuestions();
	}
}
