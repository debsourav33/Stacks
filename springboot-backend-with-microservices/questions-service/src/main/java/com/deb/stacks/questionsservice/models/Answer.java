package com.deb.stacks.questionsservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id; 

	private Long questionID;
	
    private String userId;
    private AnswerBody answerBody;

    public Answer() {
    }

    public Answer(Long id, Long questionID, AnswerBody answerBody, String userName) {
        this.id = id;
        this.questionID = questionID;
        this.userId = userName;
        this.answerBody = answerBody;
    }



    public Answer(Long id, Long questionID, String answer, String userName) {
        this(id,questionID,new AnswerBody(answer),userName);
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
