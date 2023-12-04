package com.cinema.cinemasystem.Proxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cinema.cinemasystem.dto.UpdatedTicketCounts;
import com.cinema.cinemasystem.service.ShowingService;

@Component
public class ShowingProxy {

    @Autowired
    private ShowingService showingService;

    public UpdatedTicketCounts setTicketTypes(int childTickets, int adultTickets, int seniorTickets, int row, int col, Long showId) {
        return showingService.setTicketTypes(childTickets, adultTickets, seniorTickets, row, col, showId);
    }

}
