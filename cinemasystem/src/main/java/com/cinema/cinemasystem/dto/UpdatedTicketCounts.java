package com.cinema.cinemasystem.dto;

public class UpdatedTicketCounts {
    private int updatedChildTickets;
    public int getUpdatedChildTickets() {
        return updatedChildTickets;
    }
    public void setUpdatedChildTickets(int updatedChildTickets) {
        this.updatedChildTickets = updatedChildTickets;
    }
    private int updatedAdultTickets;
    public int getUpdatedAdultTickets() {
        return updatedAdultTickets;
    }
    public void setUpdatedAdultTickets(int updatedAdultTickets) {
        this.updatedAdultTickets = updatedAdultTickets;
    }
    private int updatedSeniorTickets;
    public int getUpdatedSeniorTickets() {
        return updatedSeniorTickets;
    }
    public void setUpdatedSeniorTickets(int updatedSeniorTickets) {
        this.updatedSeniorTickets = updatedSeniorTickets;
    }
}
