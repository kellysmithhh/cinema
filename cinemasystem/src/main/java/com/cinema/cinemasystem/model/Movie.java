package com.cinema.cinemasystem.model;

import java.time.LocalDateTime;
import java.util.List;

import com.cinema.cinemasystem.enums.RATING;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String category;

    // @ManyToMany
    // @JoinTable(name = "movie_actors", joinColumns = @JoinColumn(name = "movie"), inverseJoinColumns = @JoinColumn(name = "actor"))
    // private List<Actor> cast;

    private String cast;

    private String director;

    private String producer;

    private String synopsis;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    private String trailerImage;

    private String trailerLink;

    @Enumerated(EnumType.STRING)
    private RATING mpaaRatingCode;

    // TODO DELETE THIS
    @ElementCollection
    @CollectionTable(name = "movie_show_times", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "show_time")
    private List<LocalDateTime> showTimes;

    private Integer duration;

    private boolean comingSoon;

    private boolean nowShowing;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public String getTrailerImage() {
        return trailerImage;
    }

    public void setTrailerImage(String trailerImage) {
        this.trailerImage = trailerImage;
    }

    public String getTrailerLink() {
        return trailerLink;
    }

    public void setTrailerLink(String trailerLink) {
        this.trailerLink = trailerLink;
    }

    public RATING getRatingMPAA() {
        return mpaaRatingCode;
    }

    public void setRatingMPAA(RATING mpaaRatingCode) {
        this.mpaaRatingCode = mpaaRatingCode;
    }

    public List<LocalDateTime> getShowTimes() {
        return showTimes;
    }

    public void setShowTimes(List<LocalDateTime> showTimes) {
        this.showTimes = showTimes;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public boolean isComingSoon() {
        return comingSoon;
    }

    public void setComingSoon(boolean comingSoon) {
        this.comingSoon = comingSoon;
    }

    public boolean isNowShowing() {
        return nowShowing;
    }

    public void setNowShowing(boolean nowShowing) {
        this.nowShowing = nowShowing;
    }

}
