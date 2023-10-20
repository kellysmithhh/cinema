package com.cinema.cinemasystem.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    private static String id = "";

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to) {
        String subject = "Account registration confirmation";
        String body = "Your verification code is: " + generateCode(); 
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("copelandtucker@gmail.com");
        mailSender.send(message);
    }

    public String generateCode() {
        Random random = new Random();
        id = String.format("%04d", random.nextInt(10000));
        return id;
    }

    public String getCode() {
        return id;
    }

}
