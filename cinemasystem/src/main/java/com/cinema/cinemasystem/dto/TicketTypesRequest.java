package com.cinema.cinemasystem.dto;

public class TicketTypesRequest {
    private int childTickets;
    private int adultTickets;
    private int seniorTickets;
    private int row;
    private int col;
    private Long showId;

    public TicketTypesRequest() {
    }
   
    public TicketTypesRequest(int childTickets, int adultTickets, int seniorTickets, int row, int col, Long showId) {
        this.childTickets = childTickets;
        this.adultTickets = adultTickets;
        this.seniorTickets = seniorTickets;
        this.row = row;
        this.col = col;
        this.showId = showId;
    }

     public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
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
