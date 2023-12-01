package com.cinema.cinemasystem.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cinema.cinemasystem.Repository.MovieRepository;
import com.cinema.cinemasystem.Repository.ReviewRepository;
import com.cinema.cinemasystem.Repository.ShowInfoRepository;
import com.cinema.cinemasystem.Repository.ShowRoomRepository;
import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.model.Review;
import com.cinema.cinemasystem.model.Seat;
import com.cinema.cinemasystem.model.ShowInfo;
import com.cinema.cinemasystem.model.ShowRoom;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ShowRoomRepository showRoomRepository;

    @Autowired
    private ShowInfoRepository showInfoRepository;

    public Movie add(Movie movie) {
        for (Review review : movie.getReviews()) {
            review.setMovie(movie);
        }
        movieRepository.save(movie);
        return movie;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> getComingSoon(Boolean isComingSoon) {
        return movieRepository.findByComingSoon(isComingSoon);
    }

    public Optional<Movie> getMovieWithId(Long id) {
        return movieRepository.findById(id);
    }

    public List<Movie> getMoviesByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    public List<Movie> getMoviesByCategory(String category) {
        return movieRepository.findByCategory(category);
    }

    public void addShowDates(LocalDateTime dateTime, Long movieId, Long showRoomId) {
        ShowInfo newShow = new ShowInfo();
        newShow.setDateTime(dateTime);
        Optional<Movie> maybeMovie = movieRepository.findById(movieId);
        if (maybeMovie.isPresent()) {
            Movie movie = maybeMovie.get();
            newShow.setMovie(movie);
        }
        Optional<ShowRoom> maybeShowRoom = showRoomRepository.findById(showRoomId);
        if (maybeShowRoom.isPresent()) {
            ShowRoom showRoom = maybeShowRoom.get();
            newShow.setShowroom(showRoom);
        }
        Set<Seat> seats = new HashSet<>();
        int numRows = 5;
        int numColumns = 4;
            for (int i = 1; i <= numRows; i++) {
                for (int j = 1; j <= numColumns; j++) {
                    Seat newSeat = new Seat();
                    newSeat.setSeatRow(i);
                    newSeat.setSeatColumn(j);
                    newSeat.setStatus(false);
                    seats.add(newSeat);
                }
            }
        showInfoRepository.save(newShow);
    }

    public List<String> getShowDates(Long movieID) {
        Optional<Movie> maybeMovie = movieRepository.findById(movieID);
        Movie movie = maybeMovie.get();
        List<LocalDateTime> existingLocalDateTimes = movie.getShowTimes();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        List<String> dateStringList = existingLocalDateTimes.stream()
                .map(date -> date.format(formatter))
                .toList(); // If using Java 16+, otherwise use Collectors.toList()

        return dateStringList;
    }

    public String addReview(Movie movie, Review review) {
        review.setMovie(movie);
        reviewRepository.save(review);
        return "add review success";
    }

    public List<Review> getReviews(Movie movie) {
        List<Review> reviewsList = new ArrayList<>(movie.getReviews());
        return reviewsList;
    }

}
