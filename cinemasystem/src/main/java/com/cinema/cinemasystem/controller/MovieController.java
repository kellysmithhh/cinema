package com.cinema.cinemasystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.service.MovieService;

@RestController
@RequestMapping("/movie")
@CrossOrigin(origins = "*")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @PostMapping("/add")
    public String add(@RequestBody Movie movie){
        movieService.saveMovie(movie);
        return "New movie added.";
    }

    @GetMapping("/getAll")
    public List<Movie> getAllMovies(){
        return movieService.getAllmovies();
    }
}
