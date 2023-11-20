package com.cinema.cinemasystem.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
        long movieId = Long.parseLong(id);
        Optional<Movie> maybeMovie = movieRepository.findById(movieId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        Set<LocalDateTime> localDateTimes = showDates.stream()
            .map(dateString -> LocalDateTime.parse(dateString, formatter))
            .collect(Collectors.toSet());
        if (movieRepository.findByShowTimes(localDateTimes) != null) {
            System.out.println("Time slot already taken");
        } else {
            Movie movie = maybeMovie.get();
            movie.setShowTimes(localDateTimes);
            movieRepository.save(movie);
        }
        
    }

}
