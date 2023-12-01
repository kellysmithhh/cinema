package com.cinema.cinemasystem.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

// TODO hardcode showrooms to be in the theatre

@Entity
public class ShowRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Theatre theatre;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "showRoom")
    private List<ShowInfo> shows;

    private int numSeats;

    //private List<Seat> seats;

    //public List<Seat> getSeats() {
      //  return seats;
    //}

    //public void setSeats(List<Seat> seats) {
      //  this.seats = seats;
    //}

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

    public List<ShowInfo> getShows() {
        return shows;
    }

    public void setShows(List<ShowInfo> shows) {
        this.shows = shows;
    }

}
