package com.cinema.cinemasystem.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.cinemasystem.model.ShowInfo;
import com.cinema.cinemasystem.model.Movie;



public interface ShowInfoRepository extends JpaRepository<ShowInfo, Long> {
    Optional<ShowInfo> findById(Long id);
    Optional<ShowInfo> findByDateTime(LocalDateTime dateTime);
    List<ShowInfo> findAllByDateTime(LocalDateTime dateTime);
    Optional<ShowInfo> findByMovieAndDateTime(Movie movie, LocalDateTime dateTime);
}
