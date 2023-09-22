package com.deb.stacks.userservice.Repositories;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Component;

import com.deb.stacks.userservice.Models.Credential;
import com.deb.stacks.userservice.Models.User;

@Component
public class UserRepository {
    private static List<User> users = new ArrayList<>();

    static{
        users.add(new User("Mr. Heap","heaps","1234"));
        users.add(new User("Surgical","surge","abcd"));
    }                                                   

    public boolean register(User newUser){
        for(User registeredUser: users){
            if(newUser.getId().equals(registeredUser.getId()))
                return false;
        }

        users.add(newUser);
        return true;
    }


    public User login(Credential credential){
        String userId = credential.getUserId();
        String password = credential.getPassword();
        
        for(User registeredUser: users){
            if(userId.equals(registeredUser.getId()) && password.equals(registeredUser.getPassword()))
                return registeredUser;
        }

        return null;
    }
    
    public User getUserById(String id){
        for(User user: users){
            if(id.equals(user.getId()))
                return user;
        }
        return null;
    }


    public List<User> getAllUsers() {
        return users;
    }      
}
