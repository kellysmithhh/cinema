package com.cinema.cinemasystem.Proxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cinema.cinemasystem.service.ShowingService;

@Component
public class ShowingProxy {

    @Autowired
    private ShowingService showingService;

    public void setTicketTypes(int childTickets, int adultTickets, int seniorTickets) {
        showingService.setTicketTypes(childTickets, adultTickets, seniorTickets);
    }

}
