package com.cinema.cinemasystem.Facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cinema.cinemasystem.model.PromoCode;
import com.cinema.cinemasystem.service.EmailService;
import com.cinema.cinemasystem.service.PromotionService;

@Component
public class PromotionFacade {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private EmailService emailService;

    public void addPromotion(PromoCode promotion) {
        promotionService.addPromotion(promotion);
        emailService.sendPromotion(promotion);
    }
    
}
