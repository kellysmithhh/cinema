package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cinema.cinemasystem.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Integer> {
    
}
