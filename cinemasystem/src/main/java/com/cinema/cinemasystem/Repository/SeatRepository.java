package com.cinema.cinemasystem.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cinema.cinemasystem.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long>{
    Optional<Seat> findBySeatRowAndSeatColumnAndShowInfo_Id(int row, int col, Long showId);
}
