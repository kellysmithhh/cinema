package com.cinema.cinemasystem.controller;

import java.util.List;

import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.Facade.MovieFacade;
import com.cinema.cinemasystem.model.Movie;

@RestController
@RequestMapping("/movie")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieFacade movieFacade;

    @PostMapping("/add/{mpaaRatingCode}")
    public String add(@RequestBody Movie movie, @PathVariable String mpaaRatingCode) {
        return movieFacade.add(movie, mpaaRatingCode);
    }

    @GetMapping("/getAll")
    public List<Movie> getAllMovies() {
        return movieFacade.getAllMovies();
    }

    @GetMapping("/get/coming/soon/{isComingSoon}")
    public List<Movie> getComingSoon(@PathVariable Boolean isComingSoon) {
        return movieFacade.getComingSoon(isComingSoon);
    }

    @GetMapping("/search/{searchBy}/{input}")
    public List<Movie> getMoviesByInput(@PathVariable String searchBy, @PathVariable String input) {
        return movieFacade.getMoviesByInput(searchBy, input);
    }

    @PostMapping("/{movieID}/show-dates")
    public void addShowDates(@PathVariable String movieID, @RequestBody List<String> showDates) {
        movieFacade.addShowDates(movieID, showDates);
    }
}
