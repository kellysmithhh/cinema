package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.cinemasystem.model.PromoCode;

@Repository
public interface PromotionRepository extends JpaRepository<PromoCode, Long> {
    
}
