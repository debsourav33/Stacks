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

import com.deb.stacks.questionsservice.database.QuestionJpaRepository;
import com.deb.stacks.questionsservice.models.Answer;
import com.deb.stacks.questionsservice.models.Question;
import com.deb.stacks.questionsservice.models.QuestionBody;
import com.deb.stacks.questionsservice.models.Result;
import com.deb.stacks.questionsservice.models.User;

//Since this is an spring component, this class should be up and running once this springboot application is run
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questions")  //any url of localhost:port/questions will reach this rest controller
public class QuestionServiceController {
    private static Long id = 100L;

    @Autowired
    protected RestTemplate restTemplate; 

    @Autowired
    protected QuestionJpaRepository repository;
    
    public QuestionServiceController() {
        System.out.println("QS started");
    }

    //delegate to user service for authorization
    protected User authorize(Map<String,String> headers){
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
