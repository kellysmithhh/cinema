package com.cinema.cinemasystem.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

// TODO hardcode existence of theatre(s)

@Entity
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cinemaName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "theatre")
    private List<ShowRoom> showrooms;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCinemaName() {
        return cinemaName;
    }

    public void setCinemaName(String cinemaName) {
        this.cinemaName = cinemaName;
    }

    public List<ShowRoom> getShowrooms() {
        return showrooms;
    }

    public void setShowrooms(List<ShowRoom> showrooms) {
        this.showrooms = showrooms;
    }

}
