package com.cinema.cinemasystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cinema.cinemasystem.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByTitle(String input);
    List<Movie> findByCategory(String input);
    List<Movie> findByComingSoon(Boolean isComingSoon);
}
