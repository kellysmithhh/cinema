package com.cinema.cinemasystem.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.cinema.cinemasystem.model.Ticket;

public class CreateBooking {
    private Integer bookingNumber;
    private Long movieId;
    private LocalDateTime dateTime;
    private List<Ticket> tickets;
    private String cardNumber;

    public Integer getBookingNumber() {
        return bookingNumber;
    }
    public void setBookingNumber(Integer bookingNumber) {
        this.bookingNumber = bookingNumber;
    }
    public Long getMovieId() {
        return movieId;
    }
    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
    public LocalDateTime getDateTime() {
        return dateTime;
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
    public List<Ticket> getTickets() {
        return tickets;
    }
    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
    public String getCardNumber() {
        return cardNumber;
    }
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

}
