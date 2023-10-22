package com.cinema.cinemasystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cinema.cinemasystem.model.User;
import com.cinema.cinemasystem.service.UserServiceService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String add(@RequestBody User user) {
        userService.saveMovie(user);
        return "New user added.";
    }

    // @GetMapping("/getAll")
    // public List<Movie> getAllMovies() {
    //     return movieService.getAllMovies();
    // }

    @GetMapping("/search/{email}")
    public List<User> getMoviesByTitle(@PathVariable String email) {
        return userService.getMoviesByTitle(email);
    }

    @PostMapping("/login")

}
