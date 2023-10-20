package com.deb.stacks.questionsservice.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class QuestionBody {
    private String title;
    private String body;

    public QuestionBody() {
    }

    public QuestionBody(String title, String body) {
        this.title = title;
        this.body = body;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

}
