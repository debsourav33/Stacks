package com.deb.stacks.questionsservice.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deb.stacks.questionsservice.models.Question;
import com.deb.stacks.questionsservice.models.User;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questions")  //any url of localhost:port/questions will reach this rest controller
public class QuestionDeleteController extends QuestionServiceController{

   
    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteQuestion(@RequestHeader Map<String,String> headers, @PathVariable("id") Long id){
        //check if user is authorised for deleting this question -> i.e, he was the creator
        User user = authorize(headers);
        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No correct user header provided");
        
        //first filter the list to find question that has the desired id and userName
        Optional<Question> question = repository.findById(id);
        String userId = user.getId();

        //if no such id exists
        if(question.isEmpty())  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such question id");

        //if you are not the creator of the question
        if(!question.get().getOwner().equals(userId))  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userId + ", you are not the owner. The owner is: " + question.get().getOwner());

        //id exist and you are the creator -> remove the question
        repository.deleteById(id);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question deleted");
    }

    
}
