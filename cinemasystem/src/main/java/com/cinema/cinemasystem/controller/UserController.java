package com.cinema.cinemasystem.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cinema.cinemasystem.model.User;
import com.cinema.cinemasystem.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.register(user);
        return "New user added.";
    }

    @PostMapping("/login/{email}/{password}")
    public boolean login(@PathVariable String email, @PathVariable String password) {
        Optional<User> maybeUser = userService.getWithEmail(email);
        if (maybeUser.isPresent()) {
            User user = maybeUser.get();
            if (user.getPassword().equals(password)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

}
