package com.deb.stacks.questionsservice.controllers;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.deb.stacks.questionsservice.models.Answer;
import com.deb.stacks.questionsservice.models.Question;
import com.deb.stacks.questionsservice.models.QuestionBody;
import com.deb.stacks.questionsservice.models.User;

//Since this is an spring component, this class should be up and running once this springboot application is run
@RestController
@RequestMapping("/questions")  //any url of localhost:port/questions will reach this rest controller
public class QuestionServiceController {
    private static Long id = 100L;

    @Autowired
    private RestTemplate restTemplate; 
    
    public QuestionServiceController() {
        System.out.println("QS started");
    }

    public static List<Question> questions = new ArrayList<>();

    static{
        questions.add(new Question(++id, "Centering Div", "How to Center the Div","heaps"));
        questions.add(new Question(++id, "LifeCycle", "Tell me the difference between onStart and onResume","heaps"));
        questions.add(new Question(++id, "React Native vs Flutter", "Who wins between these 2 cross-platforms?","tales"));
    };

    @GetMapping("")
    List<Question> getAllQuestions(){
        return QuestionServiceController.questions;
    }

    @GetMapping("/id/{id}")
    Question getQuestionForID(@PathVariable("id" ) Long id){
        for(Question question: questions){
            if(question.getId().equals(id))  
                return question;
        }

        return null;
    }

    @GetMapping("/user/{userName}")
    List<Question> getQuestionForUser(@PathVariable("userName") String userName){
        List<Question> ret = questions.stream()
                            .filter(question -> question.getOwner().equals(userName))
                            .collect(Collectors.toList());

        return ret;
    }

    @GetMapping("/questions&Answers/{id}")
    Question getQuestionAndAnswersForID(@PathVariable("id") Long id){
        Question ret = getQuestionForID(id);
        
        if(ret!=null){
            //ask answer service for the answers for this question
            
            String url = "http://localhost:8082/answers/questionId/" + ret.getId();

            //we are expecting a list of answers, so argument responseType = Answer[].class
            Answer[] answers = restTemplate.getForObject(url, Answer[].class);
            if(answers!=null){
                ret.setAnswers(Arrays.asList(answers));
            }
        }

        return ret;
    }

    @PostMapping("/post")
    ResponseEntity<String> postQuestion(@RequestHeader Map<String,String> headers, @RequestBody QuestionBody questionBody){
        //check the user information
        User user = authorize(headers);

        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user header provided");

        
        //create the question from the extracted questionbody (requestBody) and creator's username (httpheader)
        Question question = new Question(++id,user.getName(),questionBody);
        questions.add(question);

        return ResponseEntity.status(HttpStatus.CREATED).body("Question posted successfully");
    }
    
    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteQuestion(@RequestHeader Map<String,String> headers, @PathVariable("id") Long id){
        //check if user is authorised for deleting this question -> i.e, he was the creator
        User user = authorize(headers);
        if(user==null)  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user header provided");
        
        //first filter the list to find question that has the desired id and userName
        Optional<Question> question = questions.stream()
                        .filter(q -> q.getId().equals(id))
                        .findFirst();

        String userId = user.getId();

        //if no such id exists
        if(question.isEmpty())  
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such question id");

        //if you are not the creator of the question
        if(!question.get().getOwner().equals(userId))  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userId + ", you are not the owner. The owner is: " + question.get().getOwner());

        //id exist and you are the creator
        questions.remove(question.get());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question deleted");
    }

    //delegate to user service for authorization
    private User authorize(Map<String,String> headers){
        //convert map into httpheaders
        HttpHeaders httpHeaders = new HttpHeaders();
        for(Map.Entry<String,String> entry: headers.entrySet() ){
            httpHeaders.add(entry.getKey(), entry.getValue());
        }

        //wrap the header with an HttpEntity
        HttpEntity entity = new HttpEntity<>(httpHeaders);
        

        //Use restTemplate.exchange() to request with url and headers
        //params
        //1. url 2. entity that wraps header 3. response type
        String url = "http://localhost:8083/authorize";
        User user = restTemplate.exchange(url, HttpMethod.GET, entity, User.class).getBody();

        return user;
        
    }
}
