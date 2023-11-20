package com.cinema.cinemasystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cinema.cinemasystem.Repository.MovieRepository;
import com.cinema.cinemasystem.model.Movie;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> getComingSoon(Boolean isComingSoon) {
        return movieRepository.findByComingSoon(isComingSoon);
    }

    public List<Movie> getMoviesByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    public List<Movie> getMoviesByCategory(String category) {
        return movieRepository.findByCategory(category);
    }

    public void addShowDates(String id, List<String> showDates) {
        
    }

}
