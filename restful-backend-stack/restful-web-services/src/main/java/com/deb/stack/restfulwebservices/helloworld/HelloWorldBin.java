package com.deb.stack.restfulwebservices.helloworld;

public class HelloWorldBin {
	private String msg;
	
	public HelloWorldBin(String msg) {
		this.msg = msg;
	}
	
	public String getMsg() {
		return msg;
	}
		
	@Override
	public String toString() {
		return "Hello World Bean: " + msg;
	}
}
