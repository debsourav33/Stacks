package com.deb.stacks.answerservice.models;

public class Answer {
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
