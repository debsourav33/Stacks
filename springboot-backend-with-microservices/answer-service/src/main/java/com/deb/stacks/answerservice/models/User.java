package com.deb.stacks.answerservice.models;

public class User {
    private String name;
    private Credential credential;
        
    public User() {
    }

    public User(String name, Credential credential) {
        this.name = name;
        this.credential = credential;
    }

    public User(String name, String userId, String password) {
        this(name,new Credential(userId,password));
    }


    public Credential getCredential() {
        return credential;
    }
    public void setCredential(Credential credential) {
        this.credential = credential;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public String getId(){
        return credential.getUserId();
    }

    public String getPassword(){
        return credential.getPassword();
    }
   
}
