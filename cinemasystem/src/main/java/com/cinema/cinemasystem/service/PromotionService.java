package com.cinema.cinemasystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.PromotionRepository;
import com.cinema.cinemasystem.model.PromoCode;


@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    public void addPromotion(PromoCode promotion) {
        promotionRepository.save(promotion);
    }

}
