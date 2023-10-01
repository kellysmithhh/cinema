package com.cinema.cinemasystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cinema.cinemasystem.Repository.MovieRepository;
import com.cinema.cinemasystem.model.Movie;

@Service
public class MovieServiceImplementation implements MovieService{

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public List<Movie> getAllmovies() {
        return movieRepository.findAll();
    }

    @Override
    public List<Movie> getMoviesByTitle(String title) {
        System.out.println(title);
        return movieRepository.findByTitle(title);
    }
    
    
    
}
