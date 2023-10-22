package com.cinema.cinemasystem.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cinemaName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "theatre")
    private Set<ShowRoom> showrooms;

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

    public Set<ShowRoom> getShowrooms() {
        return showrooms;
    }

    public void setShowrooms(Set<ShowRoom> showrooms) {
        this.showrooms = showrooms;
    }

}
