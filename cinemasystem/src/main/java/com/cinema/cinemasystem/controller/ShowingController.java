package com.cinema.cinemasystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.Proxy.ShowingProxy;
import com.cinema.cinemasystem.dto.TicketTypesRequest;

@RestController
@RequestMapping("/showing")
@CrossOrigin(origins = "*")
public class ShowingController {

    @Autowired
    private ShowingProxy showingFacade;

    @PostMapping("/set/ticket/types")
    public void setTicketTypes(@RequestBody TicketTypesRequest request) {
        int childTickets = request.getChildTickets();
        int adultTickets = request.getAdultTickets();
        int seniorTickets = request.getSeniorTickets();
        showingFacade.setTicketTypes(childTickets, adultTickets, seniorTickets);
    }

}
