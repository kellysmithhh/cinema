package com.cinema.cinemasystem.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

// TODO hardcode showrooms to be in the theatre

@Entity
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
public class ShowRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "showRoom")
    // @JsonManagedReference("shows")
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

    public List<ShowInfo> getShows() {
        return shows;
    }

    public void setShows(List<ShowInfo> shows) {
        this.shows = shows;
    }

}
