package com.cinema.cinemasystem.dto;

import java.util.List;

import com.cinema.cinemasystem.model.Ticket;

public class CreateBooking {
    private Integer bookingNumber;
    private Long movie;
    private List<Ticket> tickets;
    private Long showInfo;

    public Integer getBookingNumber() {
        return bookingNumber;
    }
    public void setBookingNumber(Integer bookingNumber) {
        this.bookingNumber = bookingNumber;
    }
    public Long getMovie() {
        return movie;
    }
    public void setMovie(Long movie) {
        this.movie = movie;
    }
    public List<Ticket> getTickets() {
        return tickets;
    }
    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
    public Long getShowInfo() {
        return showInfo;
    }
    public void setShowInfo(Long showInfo) {
        this.showInfo = showInfo;
    }


}
