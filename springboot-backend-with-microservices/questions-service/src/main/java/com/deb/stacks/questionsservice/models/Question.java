package com.deb.stacks.questionsservice.models;

import java.util.List;
import java.util.Objects;


public class Question {
	
	private Long id; 
	List<Answer> answers;
	private QuestionBody questionBody;
	private String owner;

	public Question() {
		
	}
	
	public Question(Long id, String owner, QuestionBody questionBody) {
		this.id = id;
		this.owner = owner;
		this.questionBody = questionBody;
	}

	public Question(Long id, String title, String description, String owner) {
		this(id, owner, new QuestionBody(title,description));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getOwner() {
		return owner;
	}

	public void setOwner(String userName) {
		this.owner = userName;
	}

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	public QuestionBody getQuestionBody() {
		return questionBody;
	}

	public void setQuestionBody(QuestionBody questionBody) {
		this.questionBody = questionBody;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Question other = (Question) obj;
		return id == other.id;
	}
}