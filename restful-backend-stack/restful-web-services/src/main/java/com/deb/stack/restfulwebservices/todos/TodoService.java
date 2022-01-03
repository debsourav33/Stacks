package com.deb.stack.restfulwebservices.todos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class TodoService {
	private static List<Todo> todos = new ArrayList();
	private static int todoId = 0;
	
	static {
		todos.add(new Todo(++todoId,"Eat"));
		todos.add(new Todo(++todoId,"Sleep"));
		todos.add(new Todo(++todoId,"Code"));
	}
	
	public List<Todo> findAll(){
		return todos;
	}
}
