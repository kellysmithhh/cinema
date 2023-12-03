package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cinema.cinemasystem.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long>{}
