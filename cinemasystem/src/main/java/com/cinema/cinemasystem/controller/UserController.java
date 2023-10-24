package com.cinema.cinemasystem.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.service.CustomerService;
import com.cinema.cinemasystem.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

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
    public boolean login(@PathVariable String email, @PathVariable String password) {
        Optional<Customer> maybeCustomer = customerService.getWithEmail(email);
        if (maybeCustomer.isPresent()) {
            Customer customer = maybeCustomer.get();
            if (customer.getPassword().equals(password)) {
                userService.startSession(customer);
                return true;
            }
        }
        return false;
    }

    @PostMapping("/logout/{sessionId}")
    public boolean logout(@PathVariable String sessionId) {
        if (userService.hasSession(sessionId)) {
            userService.closeSession(sessionId);
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/auth/{sessionId}")
    public boolean authenticate(@PathVariable String sessionId) {
        return userService.hasSession(sessionId);
    }

    // @PostMapping("/edit/{email}/{firstName}/{lastName}/{password}/{paymentCard}")
    // public boolean edit(
    //     @PathVariable String email,
    //     @PathVariable String first,
    //     @PathVariable String last,
    //     @PathVariable String password,
    //     @RequestParam Set<PaymentCard> paymentCards
    // ) {
    //     return userService.editProfile(email, first, last, password, paymentCards);
    // }

    @PostMapping("/edit")
    public boolean editProfile(@RequestBody Customer customer) {
        return userService.editProfile(customer);
    }

}
