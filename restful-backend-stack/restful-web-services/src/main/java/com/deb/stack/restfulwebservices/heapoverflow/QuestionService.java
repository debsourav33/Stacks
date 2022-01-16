package com.deb.stack.restfulwebservices.heapoverflow;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;


@Component
public class QuestionService {
	static List<Question> questions = new ArrayList();
	static int id = 0;
	static {
		questions.add(new Question(++id, "Centering Div", "How to Center the Div"));
		questions.add(new Question(++id, "LifeCycle", "Tell me the difference between onStart and onResume"));
		questions.add(new Question(++id, "React Native vs Flutter", "Who wins between these 2 cross-platforms?"));
	}
	
	public List<Question> retrieveAllQuestions() {
		return questions;
	}	
	
	public Question save(Question question) {
		if(question.getId()==-1 || question.getId()==0) {
			question.setId(++id);
		}
		else {
			deleteQuestion(question.getId());
		}
		
		questions.add(question);
		return question;
	}
	
	public Question deleteQuestion(long id) {
		Question question = findById(id);
		
		if(question!=null) {
			questions.remove(question);
		}
		
		return question;
	}

	private Question findById(long id) {
		for(Question question: questions) {
			if (question.id==id)  return question;
		}
		return null;
	}
}
