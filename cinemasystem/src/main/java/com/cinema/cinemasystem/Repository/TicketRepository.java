package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.cinemasystem.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
