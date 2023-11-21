package com.cinema.cinemasystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.Facade.PromotionFacade;
import com.cinema.cinemasystem.model.PromoCode;

@RestController
@RequestMapping("/promotions")
@CrossOrigin(origins = "*")
public class PromotionsController {

    @Autowired
    private PromotionFacade promotionFacade;
    
    @PostMapping("/add")
    public void addPromotion(@RequestBody PromoCode promotion) {
        promotionFacade.addPromotion(promotion);
    }

}
