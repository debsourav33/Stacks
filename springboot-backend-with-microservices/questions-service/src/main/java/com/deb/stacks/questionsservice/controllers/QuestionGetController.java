package com.deb.stacks.questionsservice.controllers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deb.stacks.questionsservice.models.Answer;
import com.deb.stacks.questionsservice.models.Question;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questions")  //any url of localhost:port/questions will reach this rest controller
public class QuestionGetController extends QuestionServiceController{

    @GetMapping("")
    List<Question> getAllQuestions(){
        List<Question> questions = repository.findAll();
        var questionWithAnswers = questions.stream()
                .map(question -> {
                    //fetch answers for all questions
                    Long id = question.getId();
                    question.setAnswers(fetchAnswers(id));
                    return question;
                }).collect(Collectors.toList());

        return questionWithAnswers;
    }

    @GetMapping("/id/{id}")
    ResponseEntity<Question> getQuestionForID(@PathVariable("id" ) Long id){
        try{
            Question ret = repository.findById(id).get(); //throws NoSuchElement exception
            ret.setAnswers(fetchAnswers(ret.getId()));
            return ResponseEntity.status(HttpStatus.OK).body(ret);    
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }        
    }

    @GetMapping("/user/{userName}")
    List<Question> getQuestionForUser(@PathVariable("userName") String userName){
        List<Question> ret = repository.findByOwner(userName);

        return ret;
    }

    @GetMapping("/questions&Answers/{id}")
    Question getQuestionAndAnswersForID(@PathVariable("id") Long id){
        Question ret = getQuestionForID(id).getBody();
        
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

    private List<Answer> fetchAnswers(long qID){
        //consult answer service
        String url = "http://localhost:8082/answers/questionId/" + qID;
        List<Answer> answers = Arrays.asList(restTemplate.getForObject(url,  Answer[].class));
        return answers;

    }
}
