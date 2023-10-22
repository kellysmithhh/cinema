package com.cinema.cinemasystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cinema.cinemasystem.service.EmailService;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "*")
public class EmailServiceController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/send/{address}/{code}")
    public String send(@PathVariable String address, @PathVariable int code) {
        emailService.sendEmail(address, code);
        return "email sent";
    }
}
