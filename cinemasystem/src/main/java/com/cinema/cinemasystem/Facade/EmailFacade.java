package com.cinema.cinemasystem.Facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import com.cinema.cinemasystem.service.EmailService;

@Component
public class EmailFacade {

    @Autowired
    private EmailService emailService;

    public String send(@PathVariable String address, @PathVariable int code) {
        emailService.sendEmail(address, code);
        return "email sent";
    }

    public String send(@PathVariable String address) {
        emailService.sendConfirmation(address);
        return "email sent";
    }

    public void sendOrderConfirmation(String address) {
        emailService.sendOrderConfirmation(address);
    }

}
