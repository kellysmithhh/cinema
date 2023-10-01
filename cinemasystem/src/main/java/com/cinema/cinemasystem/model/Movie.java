package com.cinema.cinemasystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String category;
    private String cast; // change to array 
    private String director;
    private String producer;
    private String synopsis;
    private String reviews; // change to array
    private String trailer_image;
    private String trailer_link;
    private String MPAA_rating_code;
    private String show_dates; // change to array 
    private String show_times; // change to array

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getSynopsis() {
        return synopsis;
    }
    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }
    public String getReviews() {
        return reviews;
    }
    public void setReviews(String reviews) {
        this.reviews = reviews;
    }
    public String getTrailer_image() {
        return trailer_image;
    }
    public void setTrailer_image(String trailer_image) {
        this.trailer_image = trailer_image;
    }
    public String getTrailer_link() {
        return trailer_link;
    }
    public void setTrailer_link(String trailer_link) {
        this.trailer_link = trailer_link;
    }
    public String getMPAA_rating_code() {
        return MPAA_rating_code;
    }
    public void setMPAA_rating_code(String MPAA_rating_code) {
        this.MPAA_rating_code = MPAA_rating_code;
    }
    public String getShow_dates() {
        return show_dates;
    }
    public void setShow_dates(String show_dates) {
        this.show_dates = show_dates;
    }
    public String getShow_times() {
        return show_times;
    }
    public void setShow_times(String show_times) {
        this.show_times = show_times;
    }


}
