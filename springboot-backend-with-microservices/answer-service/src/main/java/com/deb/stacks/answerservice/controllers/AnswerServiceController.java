package com.deb.stacks.answerservice.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
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

import com.deb.stacks.answerservice.models.Answer;
import com.deb.stacks.answerservice.models.AnswerBody;
import com.deb.stacks.answerservice.models.User;

//Since this is an spring component, this class should be up and running once this springboot application is run
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/answers") //any url of localhost:port/answers will reach this rest controller
public class AnswerServiceController {
    private static Long id = 1000L;

    @Autowired
    private RestTemplate restTemplate;

    public AnswerServiceController() {
        System.out.println("AnswerService Started");
    }

    public static List<Answer> answers = new ArrayList<>();

    static{
        answers.addAll(Arrays.asList(
            new Answer(++id, 102L, "That's a bummer","crazy"),
            new Answer(++id, 101L, "onResume is after onStart","surgicalMask"),
            new Answer(++id, 102L, "Cross platforms perform worse","tales"),
            new Answer(++id, 105L, "Restart pls","X"),
            new Answer(++id, 102L, "To avoid complexities!","heaps"),
            new Answer(++id, 101L, "Overhead will make it worse","tales")
            )
        );
    }

    @GetMapping("")
    List<Answer> getAllAnswers(){
        return AnswerServiceController.answers;
    }


    @GetMapping("/questionId/{qid}")
    List<Answer> getAnswersForQuestion(@PathVariable("qid") Long qid){
        return AnswerServiceController.answers.stream()
                .filter(answer -> answer.getQuestionID().equals(qid))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    Answer getAnswerForID(@PathVariable("id") Long id){
        for(Answer answer: answers){
            if(answer.getId().equals(id))  
                return answer;
        }

        return null;
    }

    @GetMapping("/user/{userName}")
    List<Answer> getAnswersForUser(@PathVariable("userName") String userName){
        List<Answer> ret = answers.stream()
                            .filter(answer -> answer.getUserId().equals(userName))
                            .collect(Collectors.toList());

        return ret;
    }

    @PostMapping("/post/questionId/{qid}")
    ResponseEntity<String> postAnswer(@RequestHeader Map<String,String> headers, @PathVariable Long qid, @RequestBody AnswerBody answerBody){
        //check the user information
        User user = authorize(headers);

        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user header provided");

        
        //create the answer from the extracted answerBody (requestBody) and creator's username (httpheader)
        Answer answer = new Answer(++id, qid, answerBody, user.getId());
        answers.add(answer);

        return ResponseEntity.status(HttpStatus.CREATED).body("Answer posted successfully");
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteAnswer(@RequestHeader Map<String,String> headers, @PathVariable("id") Long id){
        //check if user is authorised for deleting this question -> i.e, he was the creator
        User user = authorize(headers);
        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No correct user header provided");
        
        //first filter the list to find question that has the desired id and userName
        Optional<Answer> answer = answers.stream()
                        .filter(q -> q.getId().equals(id))
                        .findFirst();

        String userId = user.getId();

        //if no such id exists
        if(answer.isEmpty())  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such answer id");

        //if you are not the creator of the answer
        if(!Objects.equals(userId, answer.get().getUserId()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(userId + ", you are not the owner. The owner is: " + answer.get().getUserId());

        //id exist and you are the creator
        answers.remove(answer.get());
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
}
