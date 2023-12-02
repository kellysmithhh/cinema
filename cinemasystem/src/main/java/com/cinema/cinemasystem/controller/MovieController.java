package com.cinema.cinemasystem.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.Proxy.MovieProxy;
import com.cinema.cinemasystem.dto.ShowDateRequest;
import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.model.Review;
import com.cinema.cinemasystem.model.Seat;
import com.cinema.cinemasystem.model.ShowRoom;

@RestController
@RequestMapping("/movie")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieProxy movieFacade;

    @PostMapping("/add")
    public Movie add(@RequestBody Movie movie) {
        return movieFacade.add(movie);
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

    @PostMapping("/show-dates")
    public void addShowDates(@RequestBody ShowDateRequest request) {
        LocalDateTime localDateTime = request.getDateTime();
        Long movieId = request.getMovieId();
        Long showRoomId = request.getShowRoomId();

        movieFacade.addShowDates(localDateTime, movieId, showRoomId);
    }

    @GetMapping("/{movieID}/get/show-dates")
    public List<String> getShowDates(@PathVariable Long movieID) {
        return movieFacade.getShowDates(movieID);
    }

    @PostMapping("/{movieID}/add-review")
    public String addReview(@PathVariable Long movieID, @RequestBody Review review) {
        return movieFacade.addReview(movieID, review);
    }

    @GetMapping("/{movieID}/get-reviews")
    public List<Review> getReviews(@PathVariable Long movieID) {
        return movieFacade.getReviews(movieID);
    }

    // @GetMapping("/{dateTime}/getSeats")
    // public List<Seat> getSeats(@PathVariable String dateTime) {
    //     return movieFacade.getSeats(dateTime);
    // }
}
