package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.cinemasystem.model.ShowInfo;

public interface ShowInfoRepository extends JpaRepository<ShowInfo, Long> {}
