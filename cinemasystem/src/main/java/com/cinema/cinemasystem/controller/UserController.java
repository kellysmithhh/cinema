package com.cinema.cinemasystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.model.PaymentCard;
import com.cinema.cinemasystem.model.Booking;
import com.cinema.cinemasystem.model.Customer;

import org.springframework.web.bind.annotation.GetMapping;

import com.cinema.cinemasystem.Proxy.UserProxy;
import com.cinema.cinemasystem.dto.CreateBooking;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserProxy userFacade;

    @PostMapping("/register")
    public String register(@RequestBody Customer customer) {
        return userFacade.register(customer);
    }

    @PostMapping("/login/{email}/{password}")
    public String login(@PathVariable String email, @PathVariable String password) {
        return userFacade.customerLogin(email, password);
    }

    @PostMapping("/login/admin/{adminId}/{password}")
    public String loginAdmin(@PathVariable String adminId, @PathVariable String password) {
        return userFacade.adminLogin(adminId, password);
    }

    @PostMapping("/logout/{sessionId}")
    public String logout(@PathVariable String sessionId) {
       return userFacade.logout(sessionId);
    }

    @GetMapping("/verify/{sessionId}/{password}")
    public boolean verify(@PathVariable String sessionId, @PathVariable String password) {
        return userFacade.verify(sessionId, password);
    }

    @GetMapping("/auth/{sessionId}")
    public boolean authenticate(@PathVariable String sessionId) {
        return userFacade.authenticate(sessionId);
    }

    @PostMapping("/edit")
    public boolean editProfile(@RequestBody Customer customer) {
        return userFacade.editProfile(customer);
    }

    @PostMapping("/forgotPassword/{email}/{password}")
    public void changePassword(@PathVariable String email, @PathVariable String password) {
        userFacade.changePassword(email, password);
    }

    @GetMapping("/check/promotions/{sessionId}")
    public boolean checkPromotionsValue(@PathVariable String sessionId) {
        return userFacade.checkPromotionsValue(sessionId);
    }

    @GetMapping("/get/fname/{sessionId}")
    public String getFname(@PathVariable String sessionId) {
        return userFacade.getFname(sessionId);
    }

    @GetMapping("/get/lname/{sessionId}")
    public String getLname(@PathVariable String sessionId) {
        return userFacade.getLname(sessionId);
    }

    @GetMapping("/get/phone/{sessionId}")
    public String getPhone(@PathVariable String sessionId) {
        return userFacade.getPhone(sessionId);
    }

    @GetMapping("/get/paymentCards/{sessionId}")
    public List<PaymentCard> getPaymentCards(@PathVariable String sessionId) {
        return userFacade.getPaymentCards(sessionId);
    }

    @GetMapping("/get/user/{sessionId}")
    public Customer getCustomer(@PathVariable String sessionId) {
        return userFacade.getCustomer(sessionId);
    }

    @GetMapping("/booking/get/{sessionId}")
    public List<Booking> getBookings(@PathVariable String sessionId) {
        return userFacade.getBookings(sessionId);
    }

    @PostMapping("/booking/add/{sessionId}")
    public Booking addBooking(@PathVariable String sessionId, @RequestBody CreateBooking booking) {
        return userFacade.addBooking(sessionId, booking);
    }

    // @PostMapping("/register/verify/{email}")
    // public String registerVerify(@PathVariable String email) {}

}
