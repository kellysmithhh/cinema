package com.cinema.cinemasystem.Facade;

import java.util.Base64;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinema.cinemasystem.enums.STATUS;
import com.cinema.cinemasystem.model.Admin;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.PaymentCard;
import com.cinema.cinemasystem.model.User;
import com.cinema.cinemasystem.service.AdminService;
import com.cinema.cinemasystem.service.CustomerService;
import com.cinema.cinemasystem.service.UserService;

@Component
public class UserFacade {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder security;

    public String register(Customer customer) {
        // Additional logic or validation can be added here
        Optional<Customer> existingCustomer = customerService.getWithEmail(customer.getEmail());
        if (existingCustomer.isPresent()) {
            return "user already exists with same email";
        } else {
            userService.register(customer);
            return "new user registered";
        }
    }

    public String customerLogin(String email, String password) {
        Optional<Customer> maybeCustomer = customerService.getWithEmail(email);
        if (maybeCustomer.isPresent()) {
            Customer customer = maybeCustomer.get();
            if (security.matches(password, customer.getPassword())) {
                customer.setStatus(STATUS.ACTIVE);
                return userService.startSession(customer);                
            }
        }
        return null;
    }

    public String adminLogin(String adminId, String password) {
        Optional<Admin> maybeAdmin = adminService.getWithCode(adminId);
        if (maybeAdmin.isPresent()) {
            Admin admin = maybeAdmin.get();
            // TODO check if user session already exists
            if (security.matches(password, admin.getPassword())) {
                return userService.startSession(admin);
            }
        }
        return null;
    }

    public boolean logout(String sessionId) {
        Customer maybeCustomer = customerService.getWithSesssion(sessionId);
       //Optional<User> maybeUser = userService.getWithSession(sessionId);
       //User user = maybeUser.get();
       return userService.logout(maybeCustomer);
    }

    public boolean verify(@PathVariable String sessionId, @PathVariable String password) {
        System.out.println(userService.verify(sessionId, password));
        return userService.verify(sessionId, password);
    }

    public boolean authenticate(@PathVariable String sessionId) {
        return userService.hasSession(sessionId);
    }

    public boolean editProfile(@RequestBody Customer customer) {
        return customerService.editProfile(customer);
    }

    public void changePassword(@PathVariable String email, @PathVariable String password) {
        userService.forgotPassword(email, password);
    }

    public boolean checkPromotionsValue(@PathVariable String sessionId) {
        return customerService.checkPromotionsValue(sessionId);
    }

    public String getFname(@PathVariable String sessionId) {
        Optional<User> maybeUser = userService.getWithSession(sessionId);
        User user = maybeUser.get();
        return user.getFirstName();
    }

    public String getLname(@PathVariable String sessionId) {
        Optional<User> maybeUser = userService.getWithSession(sessionId);
        User user = maybeUser.get();
        return user.getLastName();
    }

    public String getPhone(@PathVariable String sessionId) {
        Customer customer = customerService.getWithSesssion(sessionId);
        return customer.getPhone();
    }

     public Set<PaymentCard> getPaymentCards(@PathVariable String sessionId) {
        Customer customer = customerService.getWithSesssion(sessionId);
        return customer.getPaymentCards();
    }

     public Customer getCustomer(@PathVariable String sessionId) {
        Customer customer = customerService.getWithSesssion(sessionId);
        Set<PaymentCard> cards = customer.getPaymentCards();
        for (PaymentCard card : cards) {
            String cardType = new String (Base64.getDecoder().decode(card.getCardType()));
            card.setCardType(cardType); 
            
            String cardCVV = new String (Base64.getDecoder().decode(card.getCardCVV()));
            card.setCardCVV(cardCVV); 

            String cardExp = new String (Base64.getDecoder().decode(card.getCardExpiration()));
            card.setCardExpiration(cardExp); 
            
            String cardName = new String (Base64.getDecoder().decode(card.getCardName()));
            card.setCardName(cardName); 

            String cardNum = new String (Base64.getDecoder().decode(card.getCardNumber()));
            card.setCardNumber(cardNum); 

        }
        return customer;
    }

    

}