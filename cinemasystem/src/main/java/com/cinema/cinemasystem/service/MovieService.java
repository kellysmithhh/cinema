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
        Set<LocalDateTime> newLocalDateTimes = showDates.stream()
            .map(dateString -> LocalDateTime.parse(dateString, formatter))
            .collect(Collectors.toSet());
        Movie movie = maybeMovie.get();
        Set<LocalDateTime> existingLocalDateTimes = movie.getShowTimes();
        existingLocalDateTimes.addAll(newLocalDateTimes);
        List<Movie> moviesWithOverlappingTimes = movieRepository.findMoviesByOverlappingShowTimes(
            movie.getId(),
            existingLocalDateTimes,
            existingLocalDateTimes.size()
        );
        if (!moviesWithOverlappingTimes.isEmpty()) {
            System.out.println("Time slot already taken");
        } else {
            movie.setShowTimes(existingLocalDateTimes);
            movieRepository.save(movie);
            System.out.println("Time saved!");
        }
        
    }

}
