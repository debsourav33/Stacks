package com.deb.stacks.questionsservice.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class AnswerBody {
    private String answer;

    public AnswerBody() {
    }

    public AnswerBody(String answer) {
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    
}
