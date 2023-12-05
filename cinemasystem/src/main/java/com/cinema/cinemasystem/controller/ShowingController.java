package com.cinema.cinemasystem.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.Proxy.ShowingProxy;
import com.cinema.cinemasystem.dto.TicketTypesRequest;
import com.cinema.cinemasystem.dto.UpdatedTicketCounts;
import com.cinema.cinemasystem.model.Ticket;

@RestController
@RequestMapping("/showing")
@CrossOrigin(origins = "*")
public class ShowingController {

    @Autowired
    private ShowingProxy showingFacade;

    @PostMapping("/set/ticket/types")
    public List<Ticket> setTicketTypes(@RequestBody List<TicketTypesRequest> requestList) {
        List<Ticket> tickets = new ArrayList<>();
        TicketTypesRequest firstTicket = requestList.get(0);
        int childTickets = firstTicket.getChildTickets();
        int adultTickets = firstTicket.getAdultTickets();
        int seniorTickets = firstTicket.getSeniorTickets();

        UpdatedTicketCounts updatedTicketCounts = null;

        for (TicketTypesRequest request: requestList) {
            int row = request.getRow();
            int col = request.getCol();
            Long showId = request.getShowId();
            updatedTicketCounts = showingFacade.setTicketTypes(childTickets, adultTickets, seniorTickets, row, col, showId);
            childTickets = updatedTicketCounts.getUpdatedChildTickets();
            adultTickets = updatedTicketCounts.getUpdatedAdultTickets();
            seniorTickets = updatedTicketCounts.getUpdatedSeniorTickets();
            Ticket ticket = updatedTicketCounts.getTicket();
            tickets.add(ticket);
        }
        return tickets;
    }

}
