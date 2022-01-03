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
}
