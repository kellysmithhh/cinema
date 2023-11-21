package com.cinema.cinemasystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

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

    public void sendPromotion(PromoCode promotion) {
        String subject = "New Promotion";
        String body = "Promo Code: " + promotion.getPromoCode() + "Percent off: " + promotion.getPercentOff(); // promocode info 
        SimpleMailMessage message = new SimpleMailMessage();
        // to all users where promoEmail = true
        // a list of customer emails to send to 
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("copelandtucker@gmail.com");
        mailSender.send(message);
    }

}
