package com.cinema.cinemasystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMovie(Movie movie);
}