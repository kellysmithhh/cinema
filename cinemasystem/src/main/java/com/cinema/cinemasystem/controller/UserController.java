package com.cinema.cinemasystem.controller;

import java.util.List;
<<<<<<< HEAD
=======
import java.util.Optional;

import javax.swing.text.html.Option;
>>>>>>> 3b9e016fdb21a78e4bee80cb4e0f77cb60126004

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cinema.cinemasystem.model.User;
import com.cinema.cinemasystem.service.UserService;
<<<<<<< HEAD
=======
import java.util.Optional;

>>>>>>> 3b9e016fdb21a78e4bee80cb4e0f77cb60126004

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
<<<<<<< HEAD
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

=======
    public String register(@RequestBody User user) {
        userService.saveUser(user);
        return "New user added.";
    }     

    @PostMapping("/login/{email}/{password}")
    public boolean login(@PathVariable String email, @PathVariable String password) {
        Optional<User> maybeUser = userService.getWithEmail(email);
        if (maybeUser.isPresent()) {
            User user = maybeUser.get();
            if (user.getPassword().equals(password)) {
                return true;
            }
        } else {
            return false;
        }
        
    }  
    
>>>>>>> 3b9e016fdb21a78e4bee80cb4e0f77cb60126004
}
