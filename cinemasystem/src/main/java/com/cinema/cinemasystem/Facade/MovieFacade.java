package com.cinema.cinemasystem.Facade;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinema.cinemasystem.enums.RATING;
import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.model.Review;
import com.cinema.cinemasystem.service.MovieService;


@Component
public class MovieFacade {
    
@Autowired
private MovieService movieService;

    public String add(Movie movie) {
        movieService.saveMovie(movie);
        return "New movie added.";
    }

    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    public List<Movie> getComingSoon(Boolean isComingSoon) {
        return movieService.getComingSoon(isComingSoon);
    }

    public List<Movie> getMoviesByInput(String searchBy, String input) {
        System.out.println("searchBy: " + searchBy);
        if (searchBy.equals("title")) {
            System.out.println("made it to title");
            return movieService.getMoviesByTitle(input);
        } else {
            System.out.println("made it to category");
             return movieService.getMoviesByCategory(input);
        }
    }

    public void addShowDates(String id, List<String> showDates) {
        movieService.addShowDates(id, showDates);
    }

    public List<String> getShowDates(Long movieID) {
        return movieService.getShowDates(movieID);
    }

    public String addReview(Long movieID, Review review) {
        Optional<Movie> maybeMovie = movieService.getMovieWithId(movieID);
        if (maybeMovie.isPresent()) {
            return movieService.addReview(maybeMovie.get(), review);
        }
        return "movie does not exist";
    }

    public List<Review> getReviews(Long movieID) {
        Optional<Movie> maybeMovie = movieService.getMovieWithId(movieID);
        if (maybeMovie.isPresent()) {
            return movieService.getReviews(maybeMovie.get());
        }
        return null;
    }

}
