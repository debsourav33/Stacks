package com.deb.stack.restfulwebservices.heapoverflow;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@DeleteMapping("/{userName}/questions/{id}")
	public ResponseEntity<Void> deleteQuestion(@PathVariable String userName, @PathVariable long id){
		Question question = questionService.deleteQuestion(id);
		
		if(question!=null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
}
