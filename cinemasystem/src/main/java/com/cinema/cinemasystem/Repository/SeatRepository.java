package com.cinema.cinemasystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cinema.cinemasystem.model.Seat;
import com.cinema.cinemasystem.model.User;

public interface SeatRepository extends JpaRepository<Seat, Long>{
    //public List<Seat> findAll();
}
