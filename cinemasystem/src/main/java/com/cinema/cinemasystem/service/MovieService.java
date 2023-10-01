package com.cinema.cinemasystem.service;

import java.util.List;

import com.cinema.cinemasystem.model.Movie;

public interface MovieService {
    public Movie saveMovie(Movie movie);
    public List<Movie> getAllmovies();
}
