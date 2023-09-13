package com.deb.stacks.answerservice.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deb.stacks.answerservice.models.Answer;

//Since this is an spring component, this class should be up and running once this springboot application is run
@RestController
@RequestMapping("/answers") //any url of localhost:port/answers will reach this rest controller
public class AnswerServiceController {
    public static Long id = 1000L;

    

    public AnswerServiceController() {
        System.out.println("AnswerService Started");
    }

    public static List<Answer> Answers = Arrays.asList(
        new Answer(++id, 102L, "That's a bummer","crazy"),
        new Answer(++id, 101L, "onResume is after onStart","surgicalMask"),
        new Answer(++id, 102L, "Cross platforms perform worse","tales"),
        new Answer(++id, 105L, "Restart pls","X"),
        new Answer(++id, 102L, "To avoid complexities!","heaps"),
        new Answer(++id, 101L, "Overhead will make it worse","tales")
    );

    @GetMapping("")
    List<Answer> getAllAnswers(){
        return AnswerServiceController.Answers;
    }


    @GetMapping("/questionId/{qid}")
    List<Answer> getAnswersForQuestion(@PathVariable("qid") Long qid){
        return AnswerServiceController.Answers.stream()
                .filter(answer -> answer.getQuestionID().equals(qid))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    Answer getAnswerForID(@PathVariable("id") Long id){
        for(Answer answer: Answers){
            if(answer.getId().equals(id))  
                return answer;
        }

        return null;
    }

    @GetMapping("/user/{userName}")
    List<Answer> getAnswersForUser(@PathVariable("userName") String userName){
        List<Answer> ret = Answers.stream()
                            .filter(answer -> answer.getUserName().equals(userName))
                            .collect(Collectors.toList());

        return ret;
    }
}
