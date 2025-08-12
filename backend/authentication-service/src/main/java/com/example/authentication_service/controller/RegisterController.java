package com.example.authentication_service.controller;

import com.example.authentication_service.entity.NewUser;
import com.example.authentication_service.entity.UserEntity;
import com.example.authentication_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private UserService userService;

    @Value("${twitter.genres}")
    private List<String> twitterGenres;

    @PostMapping("")
    public String registerUser(@RequestBody NewUser newUser){
        try {
            userService.saveTheNewUser(newUser);
            return "success";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return "failure";
        }
    }

    @GetMapping("/checkUsername")
    public boolean checkUsername(@RequestParam String username){
        List<String> usernameList = userService.getAllUsernames();
        return usernameList.contains(username);
    }

    @GetMapping("/checkEmail")
    public boolean checkEmail(@RequestParam String email){
        List<String> emailList = userService.getAllEmails();
        return emailList.contains(email);
    }

    @GetMapping("/getAllGenres")
    public List<String> getAllGenres(){
        return twitterGenres;
    }

    @GetMapping("/getUserByUsername")
    public UserEntity getUserByUsername (@RequestParam String username){
        return userService.findByUsername(username);
    }

    @PostMapping("/updateUserProfile")
    public UserEntity updateUserProfile(@RequestBody UserEntity userEntity) {
        UserEntity savedUser = userService.save(userEntity);
        return savedUser;
    }

    @GetMapping("/getUserByUserId")
    public UserEntity getUserByUserId(@RequestParam int userId){
        return userService.findById(userId);
    }
}
