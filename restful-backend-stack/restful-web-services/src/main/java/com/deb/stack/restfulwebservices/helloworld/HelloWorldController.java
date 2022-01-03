package com.deb.stack.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {
	
	@GetMapping(path= "/hello-world")
	public String helloWorld() {
		return "Hello Shifs";
	}
	
	@GetMapping(path = "/hello-world-bin")
	public HelloWorldBin helloWorldBin() {
		return new HelloWorldBin("Hello Shifa Cat");
	}
	
	@GetMapping(path = "/hello-world/{name}")
	public HelloWorldBin helloWorldBin(@PathVariable String name) {
		return new HelloWorldBin("Hello World: "+name);
	}
}
