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
public class ShowRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Theatre theatre;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "showRoom")
    private Set<ShowInfo> shows;

    
    // private Set<Seat> seats;

    // public Set<Seat> getSeats() {
    //     return seats;
    // }

    // public void setSeats(Set<Seat> seats) {
    //     this.seats = seats;
    // }

    private int numSeats;    

    public int getNumSeats() {
        return numSeats;
    }

    public void setNumSeats(int numSeats) {
        this.numSeats = numSeats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Theatre getTheatre() {
        return theatre;
    }

    public void setTheatre(Theatre theatre) {
        this.theatre = theatre;
    }

    public Set<ShowInfo> getShows() {
        return shows;
    }

    public void setShows(Set<ShowInfo> shows) {
        this.shows = shows;
    }

}
