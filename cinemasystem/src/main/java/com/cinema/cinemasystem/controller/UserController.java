package com.cinema.cinemasystem.controller;

import java.util.Optional;
import java.util.Set;
import  java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.model.PaymentCard;
import com.cinema.cinemasystem.model.User;
import com.cinema.cinemasystem.enums.STATUS;
import com.cinema.cinemasystem.model.Admin;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.service.AdminService;
import com.cinema.cinemasystem.service.CustomerService;
import com.cinema.cinemasystem.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import com.cinema.cinemasystem.Repository.CustomerRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder security;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/register")
    public String register(@RequestBody Customer customer) {
        Optional<Customer> existingCustomer = customerService.getWithEmail(customer.getEmail());
        if (existingCustomer.isPresent()) {
            return "user already exists with same email";
        } else {
            userService.register(customer);
            return "new user registered";
        }
    }

    @PostMapping("/login/{email}/{password}")
    public String login(@PathVariable String email, @PathVariable String password) {
        Optional<Customer> maybeCustomer = customerService.getWithEmail(email);
        if (maybeCustomer.isPresent()) {
            Customer customer = maybeCustomer.get();
            // TODO check if user session already exists
            if (security.matches(password, customer.getPassword())) {
                customer.setStatus(STATUS.ACTIVE);
                return userService.startSession(customer);                
            }
        }
        return null;
    }

    @PostMapping("/login/admin/{adminId}/{password}")
    public String loginAdmin(@PathVariable String adminId, @PathVariable String password) {
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

    @PostMapping("/logout/{sessionId}")
    public boolean logout(@PathVariable String sessionId) {
       Customer maybeCustomer = customerService.getWithSesssion(sessionId);
       //Optional<User> maybeUser = userService.getWithSession(sessionId);
       //User user = maybeUser.get();
       return userService.logout(maybeCustomer);
    }

    @GetMapping("/verify/{sessionId}/{password}")
    public boolean verify(@PathVariable String sessionId, @PathVariable String password) {
        System.out.println(userService.verify(sessionId, password));
        return userService.verify(sessionId, password);
    }

    @GetMapping("/auth/{sessionId}")
    public boolean authenticate(@PathVariable String sessionId) {
        return userService.hasSession(sessionId);
    }

    @PostMapping("/edit")
    public boolean editProfile(@RequestBody Customer customer) {
        return customerService.editProfile(customer);
    }

    @PostMapping("/forgotPassword/{email}/{password}")
    public void changePassword(@PathVariable String email, @PathVariable String password) {
        userService.forgotPassword(email, password);
    }

    @GetMapping("/check/promotions/{sessionId}")
    public boolean checkPromotionsValue(@PathVariable String sessionId) {
        return customerService.checkPromotionsValue(sessionId);
    }

    @GetMapping("/get/fname/{sessionId}")
    public String getFname(@PathVariable String sessionId) {
        Optional<User> maybeUser = userService.getWithSession(sessionId);
        User user = maybeUser.get();
        return user.getFirstName();
    }

    @GetMapping("/get/lname/{sessionId}")
    public String getLname(@PathVariable String sessionId) {
        Optional<User> maybeUser = userService.getWithSession(sessionId);
        User user = maybeUser.get();
        return user.getLastName();
    }

    @GetMapping("/get/phone/{sessionId}")
    public String getPhone(@PathVariable String sessionId) {
        Customer customer = customerService.getWithSesssion(sessionId);
        return customer.getPhone();
    }

    @GetMapping("/get/paymentCards/{sessionId}")
    public Set<PaymentCard> getPaymentCards(@PathVariable String sessionId) {
        Customer customer = customerService.getWithSesssion(sessionId);
        return customer.getPaymentCards();
    }

    @GetMapping("/get/user/{sessionId}")
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

    // @PostMapping("/register/verify/{email}")
    // public String registerVerify(@PathVariable String email) {}

}
