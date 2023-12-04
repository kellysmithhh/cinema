package com.cinema.cinemasystem.Proxy;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.model.Review;
import com.cinema.cinemasystem.model.Seat;
import com.cinema.cinemasystem.service.MovieService;


@Component
public class MovieProxy {

    @Autowired
    private MovieService movieService;

    public Movie add(Movie movie) {
        return movieService.add(movie);
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

    public boolean addShowDates(LocalDateTime dateTime, Long movieId, Long showRoomId) {
        return movieService.addShowDates(dateTime, movieId, showRoomId);
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

    public List<Seat> getSeats(Long movieId, LocalDateTime dateTime) {
        // Optional<Movie> maybeMovie = movieService.getMovieWithId(movieId);
        // if (maybeMovie.isPresent()) {
        //     return movieService.getSeats(movieId, dateTime);
        // }
        // return new ArrayList<Seat>();
        return movieService.getSeats(movieId, dateTime);
    }

    // public List<Seat> getSeats(String dateTime,Long movieID) {
    //     Optional<ShowInfo> maybeShowInfo = movieService.getShowInfoByDate(dateTime,movieID);
    //     return movieService.getAllSeats(maybeShowInfo);
    // }

}
