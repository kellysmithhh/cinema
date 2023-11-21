package com.cinema.cinemasystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.PromoCode;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, int code) {
        String subject = "Account Verification Code";
        String body = "Your verification code is: " + code; 
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("copelandtucker@gmail.com");
        mailSender.send(message);
    }

    public void sendConfirmation(String to) {
        String subject = "Account confirmation";
        String body = "Congrats! Your account has been created!"; 
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("copelandtucker@gmail.com");
        mailSender.send(message);
    }

    public void sendPromotion(PromoCode promotion, List<Customer> customers) {
        String subject = "New Promotion";
        String body = "Promo Code: " + promotion.getPromoCode() + " Percent off: " + promotion.getPercentOff(); // promocode info 
        String to = "";
        for (Customer customer : customers) {
            SimpleMailMessage message = new SimpleMailMessage();
            to = customer.getEmail();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("copelandtucker@gmail.com");
            mailSender.send(message);
        }
    }

}
