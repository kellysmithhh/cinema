package com.cinema.cinemasystem.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cinema.cinemasystem.Repository.MovieRepository;
import com.cinema.cinemasystem.Repository.ReviewRepository;
import com.cinema.cinemasystem.Repository.SeatRepository;
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

    @Autowired
    private SeatRepository seatRepository;

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

    public boolean addShowDates(LocalDateTime dateTime, Long movieId, Long showRoomId) {

        // prevent movie from being scheduled at same showroom at same time
        Optional<Movie> alreadyMovie = getMovieFromShowRoomAndDateTime(showRoomId, dateTime);
        if (alreadyMovie.isPresent()) {
            System.out.println("SHOW ROOM ALREADY HAS MOVIE AT THAT TIME");
            return false;
        }

        // prevent movie from being set again to the same showroom at same time
        Optional<ShowInfo> maybeShowInfo = getInfoWithIdAndDateTime(movieId, dateTime);
        if (maybeShowInfo.isPresent()) {
            System.out.println("MOVIE AT TIME ALREADY EXISTS");
            return false;
        }

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

        ShowInfo savedShow = showInfoRepository.save(newShow);

        List<Seat> seats = new ArrayList<Seat>();
        int numRows = 5;
        int numColumns = 4;
            for (int i = 1; i <= numRows; i++) {
                for (int j = 1; j <= numColumns; j++) {
                    Seat newSeat = new Seat();
                    newSeat.setSeatRow(i);
                    newSeat.setSeatColumn(j);
                    newSeat.setStatus(false);
                    newSeat.setShowInfo(savedShow);
                    seats.add(newSeat);
                    //seatRepository.save(newSeat);
                }
            }
        seatRepository.saveAll(seats);
        newShow.setSeats(seats);
        showInfoRepository.save(savedShow);
        return true;
    }

    public List<String> getShowDates(Long movieID) {
        List<ShowInfo> maybeShowInfo = showInfoRepository.findAll();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        List<LocalDateTime> existingLocalDateTimes = new ArrayList<>();
        for (int i = 0; i < maybeShowInfo.size(); i++) {
            if (maybeShowInfo.get(i).getMovie().getId() == movieID) {
                existingLocalDateTimes.add(maybeShowInfo.get(i).getDateTime());
            }
        }

       // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
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

    public void autoCreate (Long id, int numSeats) {
        Optional<ShowRoom> existing = showRoomRepository.findById(id);
        if (existing.isPresent()) return;

        ShowRoom showRoom = new ShowRoom();
        showRoom.setId(id);
        showRoom.setNumSeats(numSeats);
        showRoomRepository.save(showRoom);
    }

    public List<Seat> getSeats(Long movieId, LocalDateTime dateTime) {
        Optional<ShowInfo> showInfo = getInfoWithIdAndDateTime(movieId, dateTime);
        if (showInfo.isEmpty()) return new ArrayList<Seat>();

        return showInfo.get().getSeats();
    }

    public Optional<ShowInfo> getInfoWithIdAndDateTime(Long movieId, LocalDateTime dateTime) {
        Optional<Movie> maybeMovie = movieRepository.findById(movieId);
        if (maybeMovie.isEmpty()) {
            System.out.println("MOVIE DOES NOT EXIST");
            return Optional.empty();
        }

        List<ShowInfo> infos = showInfoRepository.findAllByDateTime(dateTime);
        for (ShowInfo info : infos) {
            if (info.getMovie().getId() == movieId) {
                return Optional.of(info);
            }
        }

        System.out.println("MOVIE NOT FOUND AT THAT TIME");
        return Optional.empty();
    }

    public Optional<Movie> getMovieFromShowRoomAndDateTime(Long showRoomId, LocalDateTime dateTime) {
        Optional<ShowRoom> maybeShowRoom = showRoomRepository.findById(showRoomId);
        if (maybeShowRoom.isEmpty()) return Optional.empty();

        List<ShowInfo> infos = maybeShowRoom.get().getShows();
        for (ShowInfo info : infos) {
            if (info.getDateTime().equals(dateTime)) {
                return Optional.of(info.getMovie());
            }
        }

        return Optional.empty();
    }

    public String updateStatus(Movie movie, Boolean comingSoon, Boolean nowShowing) {
        movie.setComingSoon(comingSoon);
        movie.setNowShowing(nowShowing);
        movieRepository.save(movie);
        return "movie update status success";
    }
}