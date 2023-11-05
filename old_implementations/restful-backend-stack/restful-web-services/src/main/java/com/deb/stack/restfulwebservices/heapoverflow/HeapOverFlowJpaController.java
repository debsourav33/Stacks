package com.deb.stack.restfulwebservices.heapoverflow;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HeapOverFlowJpaController {	
	@Autowired
	QuestionJpaRepository questionJpaRepository;
	
	@GetMapping("/jpa/questions")
	public List<Question> getAllQuestions() {
		return questionJpaRepository.findAll();
	}

	@DeleteMapping("/jpa/{userName}/questions/{id}")
	public ResponseEntity<Void> deleteQuestion(@PathVariable String userName, @PathVariable long id) {
		questionJpaRepository.deleteById(id);

		return ResponseEntity.noContent().build();
	}

	@PutMapping("/jpa/{userName}/questions/{id}")
	public ResponseEntity<Question> updateQuestion(@PathVariable String userName, @PathVariable long id,
			@RequestBody Question question) {
		question.setUserName(userName);
		Question updatedQuestion = questionJpaRepository.save(question);
		return new ResponseEntity<Question>(updatedQuestion, HttpStatus.OK);
	}

	@PostMapping("/jpa/{userName}/questions")
	public ResponseEntity<Void> addQuestion(@PathVariable String userName, @RequestBody Question question) {
		question.setUserName(userName);
		Question createdQuestion = questionJpaRepository.save(question);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdQuestion.getId())
				.toUri();

		return ResponseEntity.created(uri).build();

	}
}
