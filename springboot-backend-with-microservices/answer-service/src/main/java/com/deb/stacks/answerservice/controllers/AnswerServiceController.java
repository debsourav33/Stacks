package com.deb.stacks.answerservice.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.deb.stacks.answerservice.database.AnswerJpaRepository;
import com.deb.stacks.answerservice.models.Answer;
import com.deb.stacks.answerservice.models.AnswerBody;
import com.deb.stacks.answerservice.models.User;

import jakarta.annotation.PostConstruct;

//Since this is an spring component, this class should be up and running once this springboot application is run
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/answers") //any url of localhost:port/answers will reach this rest controller
public class AnswerServiceController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AnswerJpaRepository repository;

    public AnswerServiceController() {
        System.out.println("AnswerService Started");
    }

    @PostConstruct
    public void initDB(){
        //just do it one time

        //repository.saveAndFlush(new Answer(2L, "That's a bummer","crazy"));
        //repository.saveAndFlush(new Answer(1L, "onResume is after onStart","surgicalMask"));
        //repository.saveAndFlush(new Answer(2L, "Cross platforms perform worse","tales"));
        //repository.saveAndFlush(new Answer(5L, "Restart pls","X"));
        //repository.saveAndFlush(new Answer(2L, "To avoid complexities!","heaps"));
        //repository.saveAndFlush(new Answer(1L, "Overhead will make it worse","tales"));
    }

    @GetMapping("")
    List<Answer> getAllAnswers(){
        return repository.findAll();
    }


    @GetMapping("/questionId/{qid}")
    List<Answer> getAnswersForQuestion(@PathVariable("qid") Long qid){
        return repository.findByQuestionID(qid);
    }

    @GetMapping("/{id}")
    ResponseEntity<Answer> getAnswerForID(@PathVariable("id") Long id){
        try{
            Answer answer = repository.findById(id).get();
            return ResponseEntity.status(HttpStatus.OK).body(answer);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        catch(NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/user/{userName}")
    List<Answer> getAnswersForUser(@PathVariable("userName") String userName){
        List<Answer> ret = repository.findByUserId(userName);
        return ret;
    }

    @PostMapping("/post/questionId/{qid}")
    ResponseEntity<String> postAnswer(@RequestHeader Map<String,String> headers, @PathVariable Long qid, @RequestBody AnswerBody answerBody){
        //check the user information
        User user = authorize(headers);

        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user header provided");

        
        //create the answer from the extracted answerBody (requestBody) and creator's username (httpheader)
        Answer answer = new Answer(qid, answerBody, user.getId());
        Answer savedAnswer = repository.saveAndFlush(answer);

        return ResponseEntity.status(HttpStatus.CREATED).body("Answer posted successfully with ID " + savedAnswer.getId());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteAnswer(@RequestHeader Map<String,String> headers, @PathVariable("id") Long id){
        //check if user is authorised for deleting this question -> i.e, he was the creator
        User user = authorize(headers);
        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No correct user header provided");
        
        //first filter the list to find question that has the desired id and userName
        Optional<Answer> answer = repository.findById(id);

        String userId = user.getId();

        //if no such id exists
        if(answer.isEmpty())  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such answer id");

        //if you are not the creator of the answer
        if(!Objects.equals(userId, answer.get().getUserId()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(userId + ", you are not the owner. The owner is: " + answer.get().getUserId());

        //id exist and you are the creator
        repository.deleteById(id);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Answer deleted");
    }
    
    //delegate to user service for authorization
    private User authorize(Map<String,String> headers){
        //convert map into httpheaders
        HttpHeaders httpHeaders = new HttpHeaders();
        for(Map.Entry<String,String> entry: headers.entrySet() ){
            httpHeaders.add(entry.getKey(), entry.getValue());
        }

        //wrap the header with an HttpEntity
        HttpEntity<HttpHeaders> entity = new HttpEntity<>(httpHeaders);
        

        //Use restTemplate.exchange() to request with url and headers
        //params
        //1. url 2. entity that wraps header 3. response type
        String url = "http://localhost:8083/authorize";
        User user = restTemplate.exchange(url, HttpMethod.GET, entity, User.class).getBody();

        return user;
        
    }


    //just for testing
    @DeleteMapping("")
    public void deleteAllAnswer(){
        repository.deleteAll();
    }
}
