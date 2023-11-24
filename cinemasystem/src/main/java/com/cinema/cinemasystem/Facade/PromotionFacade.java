package com.cinema.cinemasystem.Facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.PromoCode;
import com.cinema.cinemasystem.service.CustomerService;
import com.cinema.cinemasystem.service.EmailService;
import com.cinema.cinemasystem.service.PromotionService;

@Component
public class PromotionFacade {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CustomerService customerService;

    public void addPromotion(PromoCode promotion) {
        promotionService.addPromotion(promotion);
        List<Customer> customers = customerService.getAllPromoCustomers();
        emailService.sendPromotion(promotion, customers);
    }
    
    public List<PromoCode> getAll() {
        return promotionService.getAll();
    }
}
