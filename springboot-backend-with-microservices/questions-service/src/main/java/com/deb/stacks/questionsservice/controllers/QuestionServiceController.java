package com.deb.stacks.questionsservice.controllers;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.deb.stacks.questionsservice.models.Answer;
import com.deb.stacks.questionsservice.models.Question;

//Since this is an spring component, this class should be up and running once this springboot application is run
@RestController
@RequestMapping("/questions")  //any url of localhost:port/questions will reach this rest controller
public class QuestionServiceController {
    private static Long id = 100L;
    private RestTemplate restTemplate = new RestTemplate(); 
    

    public QuestionServiceController() {
        System.out.println("QS started");
    }

    public static List<Question> questions = Arrays.asList(
        new Question(++id, "Centering Div", "How to Center the Div","heaps"),
        new Question(++id, "LifeCycle", "Tell me the difference between onStart and onResume","heaps"),
        new Question(++id, "React Native vs Flutter", "Who wins between these 2 cross-platforms?","tales")
    );

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
                            .filter(question -> question.getUserName().equals(userName))
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
}
