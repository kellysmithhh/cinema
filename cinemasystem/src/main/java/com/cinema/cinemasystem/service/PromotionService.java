package com.cinema.cinemasystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.cinema.cinemasystem.Repository.PromotionRepository;
import com.cinema.cinemasystem.model.PromoCode;


@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    public void addPromotion(PromoCode promotion) {
        promotionRepository.save(promotion);
    }

    public List<PromoCode> getAll() {
        return promotionRepository.findAll();
    }

    public String checkPromo(String promoInput) {
        Optional<PromoCode> maybePromo = promotionRepository.findByPromoCode(promoInput);
        if (maybePromo.isPresent()) {
            PromoCode promo = maybePromo.get();
            return promo.getPercentOff();
        }
        return "code not present";
    }

}
