package com.cinema.cinemasystem.model;

import com.cinema.cinemasystem.enums.TTYPE;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    // @JsonBackReference("booking-tickets")
    private Booking booking;

    @OneToOne(mappedBy = "ticket", cascade = CascadeType.ALL)
    // @JsonManagedReference("ticket-seat")
    private Seat seat;

    private TTYPE ticketType;

    public TTYPE getTicketType() {
        return ticketType;
    }

    public void setTicketType(TTYPE ticketType) {
        this.ticketType = ticketType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

}
