package com.deb.stacks.questionsservice.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deb.stacks.questionsservice.models.Question;
import com.deb.stacks.questionsservice.models.QuestionBody;
import com.deb.stacks.questionsservice.models.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questions")  //any url of localhost:port/questions will reach this rest controller
public class QuestionPostController extends QuestionServiceController{
    
    @PostMapping("/post")
    ResponseEntity<String> postQuestion(@RequestHeader Map<String,String> headers, @RequestBody QuestionBody questionBody){
        //check the user information
        User user = authorize(headers);

        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No correct user header provided");

        
        //create the question from the extracted questionbody (requestBody) and creator's username (httpheader)
        Question question = new Question(user.getCredential().getUserId(),questionBody);
        Question postedQuestion = repository.saveAndFlush(question);


        return ResponseEntity.status(HttpStatus.CREATED).body("Created with id: "+postedQuestion.getId());
    }
    
}
