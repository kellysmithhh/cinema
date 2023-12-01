package com.cinema.cinemasystem.dto;

import java.time.LocalDateTime;

public class ShowDateRequest {
    private LocalDateTime dateTime;
    private Long movieId;
    private Long showRoomId;

    // Getter and Setter for dateTime
    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    // Getter and Setter for movieId
    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    // Getter and Setter for showRoomId
    public Long getShowRoomId() {
        return showRoomId;
    }

    public void setShowRoomId(Long showRoomId) {
        this.showRoomId = showRoomId;
    }
}