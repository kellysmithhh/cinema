package com.cinema.cinemasystem.dto;

public class TicketTypesRequest {
    private int childTickets;
    private int adultTickets;
    private int seniorTickets;

    public TicketTypesRequest() {
    }
   
    public TicketTypesRequest(int childTickets, int adultTickets, int seniorTickets) {
        this.childTickets = childTickets;
        this.adultTickets = adultTickets;
        this.seniorTickets = seniorTickets;
    }


    public int getChildTickets() {
        return childTickets;
    }

    public void setChildTickets(int childTickets) {
        this.childTickets = childTickets;
    }

    public int getAdultTickets() {
        return adultTickets;
    }

    public void setAdultTickets(int adultTickets) {
        this.adultTickets = adultTickets;
    }

    public int getSeniorTickets() {
        return seniorTickets;
    }

    public void setSeniorTickets(int seniorTickets) {
        this.seniorTickets = seniorTickets;
    }
}
