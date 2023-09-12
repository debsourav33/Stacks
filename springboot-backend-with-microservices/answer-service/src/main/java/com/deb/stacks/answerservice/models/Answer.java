package com.deb.stacks.answerservice.models;

public class Answer {
    private Long id; 
	private Long questionID;
	private String answer;
	private String userName;
    
    public Answer() {
    }

    public Answer(Long id, Long questionID, String answer, String userName) {
        this.id = id;
        this.questionID = questionID;
        this.answer = answer;
        this.userName = userName;
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

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String question) {
        this.answer = question;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    

    

}
