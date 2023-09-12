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

import com.deb.stacks.questionsservice.models.Question;

//Since this is an spring component, this class should be up and running once this springboot application is run
@RestController
@RequestMapping("/questions")  //any url of localhost:port/questions will reach this rest controller
public class QuestionServiceController {
    public static Long id = 100L;

    

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

    @GetMapping("/{id}")
    Question getQuestionForID(@PathVariable("id" ) Long id){
        for(Question question: questions){
            if(question.getId() == id)  
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

}
