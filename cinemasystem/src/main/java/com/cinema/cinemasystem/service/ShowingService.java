package com.cinema.cinemasystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.TicketRepository;
import com.cinema.cinemasystem.enums.TTYPE;
import com.cinema.cinemasystem.model.Ticket;

@Service
public class ShowingService {

    @Autowired
    private TicketRepository ticketRepository;

    public void setTicketTypes(int childTickets, int adultTickets, int seniorTickets) {
        for (int i = 0; i < childTickets; i++) {
            Ticket childTicket = new Ticket();
            childTicket.setTicketType(TTYPE.CHILD);
            ticketRepository.save(childTicket);
        }

        for (int i = 0; i < adultTickets; i++) {
            Ticket adultTicket = new Ticket();
            adultTicket.setTicketType(TTYPE.ADULT);
            ticketRepository.save(adultTicket);
        }

        for (int i = 0; i < seniorTickets; i++) {
            Ticket seniorTicket = new Ticket();
            seniorTicket.setTicketType(TTYPE.SENIOR);
            ticketRepository.save(seniorTicket);
        }
    }

}
