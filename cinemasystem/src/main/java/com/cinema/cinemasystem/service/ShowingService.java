package com.cinema.cinemasystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.SeatRepository;
import com.cinema.cinemasystem.Repository.TicketRepository;
import com.cinema.cinemasystem.dto.UpdatedTicketCounts;
import com.cinema.cinemasystem.enums.TTYPE;
import com.cinema.cinemasystem.model.Seat;
import com.cinema.cinemasystem.model.Ticket;

@Service
public class ShowingService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired SeatRepository seatRepository;

    public UpdatedTicketCounts setTicketTypes(int childTickets, int adultTickets, int seniorTickets, int row, int col, Long showId) {
        UpdatedTicketCounts updatedTicketCounts = new UpdatedTicketCounts();
        Optional<Seat> maybeSeat = seatRepository.findBySeatRowAndSeatColumnAndShowInfo_Id(row, col, showId);
        if (maybeSeat.isPresent()) {
            Seat seat = maybeSeat.get();
            if (childTickets > 0) {
                Ticket childTicket = new Ticket();
                childTicket.setTicketType(TTYPE.CHILD);
                Ticket savedTicket = ticketRepository.save(childTicket);
                seat.setTicket(savedTicket);
                seat.setStatus(true);
                seatRepository.save(seat);
                childTickets--;
                updatedTicketCounts.setTicket(savedTicket);
            } else if (adultTickets > 0) {
                Ticket adultTicket = new Ticket();
                adultTicket.setTicketType(TTYPE.ADULT);
                Ticket savedTicket = ticketRepository.save(adultTicket);
                seat.setTicket(savedTicket);
                seat.setStatus(true);
                seatRepository.save(seat);
                adultTickets--;
                updatedTicketCounts.setTicket(savedTicket);
            } else if (seniorTickets > 0) {
                Ticket seniorTicket = new Ticket();
                seniorTicket.setTicketType(TTYPE.SENIOR);
                Ticket savedTicket = ticketRepository.save(seniorTicket);
                seat.setTicket(savedTicket);
                seat.setStatus(true);
                seatRepository.save(seat);
                seniorTickets--;
                updatedTicketCounts.setTicket(savedTicket);
            }
            updatedTicketCounts.setUpdatedChildTickets(childTickets);
            updatedTicketCounts.setUpdatedAdultTickets(adultTickets);
            updatedTicketCounts.setUpdatedSeniorTickets(seniorTickets);
        }
        return updatedTicketCounts;
    }

}
