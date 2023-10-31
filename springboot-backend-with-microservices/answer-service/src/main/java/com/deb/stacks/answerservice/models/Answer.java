package com.deb.stacks.answerservice.models;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id; 

	private Long questionID;
	private String userId;
    
    @Embedded
    private AnswerBody answerBody;

    public Answer() {
    }

    public Answer(Long questionID, AnswerBody answerBody, String userName) {
        this.questionID = questionID;
        this.userId = userName;
        this.answerBody = answerBody;
    }



    public Answer(Long questionID, String answer, String userName) {
        this(questionID,new AnswerBody(answer),userName);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionID() {
        return questionID;
    }

    public void setQuestionID(Long questionID) {
        this.questionID = questionID;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userName) {
        this.userId = userName;
    }

    public AnswerBody getAnswerBody() {
        return answerBody;
    }

    public void setAnswerBody(AnswerBody answerBody) {
        this.answerBody = answerBody;
    }    

}
