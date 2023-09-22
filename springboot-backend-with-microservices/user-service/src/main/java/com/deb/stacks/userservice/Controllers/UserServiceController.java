package com.deb.stacks.userservice.Controllers;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.deb.stacks.userservice.Models.Credential;
import com.deb.stacks.userservice.Models.User;
import com.deb.stacks.userservice.Repositories.UserRepository;

@RestController
public class UserServiceController {
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){
        boolean created = userRepository.register(user);

        return created ? ResponseEntity.status(HttpStatus.CREATED).body(user)
                       :  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Credential credential){
        User user = userRepository.login(credential);

        return user != null ? ResponseEntity.status(HttpStatus.OK).body(user)
                    : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable String id){
        return userRepository.getUserById(id);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.getAllUsers();
    }
}
