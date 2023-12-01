package com.cinema.cinemasystem.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TTYPE {
    CHILD, ADULT, SENIOR;

    @JsonCreator
    public static TTYPE forValue(String key) {
        return TTYPE.valueOf(key);
    }
}
