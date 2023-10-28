package com.cinema.cinemasystem.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.cinemasystem.model.User;
import com.cinema.cinemasystem.model.Admin;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.service.AdminService;
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

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder security;

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
       Optional<User> maybeUser = userService.getWithSession(sessionId);
       User user = maybeUser.get();
       return userService.logout(user);
    }

    @GetMapping("/verify/{sessionId}/{password}")
    public boolean verify(@PathVariable String sessionId, @PathVariable String password) {
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

    // @PostMapping("/register/verify/{email}")
    // public String registerVerify(@PathVariable String email) {}

}
