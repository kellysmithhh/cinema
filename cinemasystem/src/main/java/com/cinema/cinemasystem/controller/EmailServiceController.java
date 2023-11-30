package com.cinema.cinemasystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.Facade.EmailFacade;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "*")
public class EmailServiceController {

    @Autowired
    private EmailFacade emailFacade;

    @PostMapping("/send/{address}/{code}")
    public String send(@PathVariable String address, @PathVariable int code) {
        return emailFacade.send(address, code);
    }

    @PostMapping("/send/confirmation/{address}")
    public String send(@PathVariable String address) {
        return emailFacade.send(address);
    }

    @PostMapping("/send/order/confirmation/{address}")
    public void sendOrderConfirmation(@PathVariable String address) {
        emailFacade.sendOrderConfirmation(address);
    }
}
