package com.deb.stack.restfulwebservices.todos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoResource {
	@Autowired
	private TodoService todoService;		
	
	@GetMapping(path = "/users/{userName}/todos")
	public List<Todo> allTodos(@PathVariable String userName) throws InterruptedException{
		//Simulate Latency
		Thread.sleep(3000);
		return todoService.findAll();
	}
}
