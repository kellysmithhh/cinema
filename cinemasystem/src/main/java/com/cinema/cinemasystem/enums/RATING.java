package com.cinema.cinemasystem.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum RATING {
    G, PG, PG13, R, NC17;

    @JsonCreator
    public static RATING forValue(String key) {
        return RATING.valueOf(key);
    }
}