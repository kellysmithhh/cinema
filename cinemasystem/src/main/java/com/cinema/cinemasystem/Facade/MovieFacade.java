package com.cinema.cinemasystem.Facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.service.MovieService;



public class MovieFacade {
    
@Autowired
private MovieService movieService;

public String add(@RequestBody Movie movie) {
        movieService.saveMovie(movie);
        return "New movie added.";
    }

    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    public List<Movie> getMoviesByTitle(@PathVariable String title) {
        return movieService.getMoviesByTitle(title);
    }

}
