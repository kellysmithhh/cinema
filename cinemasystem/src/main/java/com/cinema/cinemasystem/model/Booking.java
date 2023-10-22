package com.cinema.cinemasystem.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer bookingNumber;

    // bookings can have only one user
    // & can get "credit card info" from this user ref (11)
    @ManyToOne
    private User user;

    // single booking can have multiple tickets
    // and each ticket can only be associated with this booking
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "booking")
    private Set<Ticket> tickets;

    // bookings can have only one movie
    // & can get "movie title" from this movie ref (11)
    @ManyToOne
    private Movie movie;

    // bookings can have only one show info
    @ManyToOne
    private ShowInfo show;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBookingNumber() {
        return bookingNumber;
    }

    public void setBookingNumber(Integer bookingNumber) {
        this.bookingNumber = bookingNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public ShowInfo getShow() {
        return show;
    }

    public void setShow(ShowInfo show) {
        this.show = show;
    }

}
