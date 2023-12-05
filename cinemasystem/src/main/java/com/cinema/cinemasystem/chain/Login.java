package com.cinema.cinemasystem.chain;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.model.Admin;
import com.cinema.cinemasystem.service.AdminService;
import com.cinema.cinemasystem.service.UserService;

@Service
public class Login {

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder security;

    @Autowired
    private UserService userService;

    public String adminLogin(String adminId, String password) {
        Optional<Admin> maybeAdmin = adminService.getWithCode(adminId);
        if (maybeAdmin.isPresent()) {
            Admin admin = maybeAdmin.get();
            if (security.matches(password, admin.getPassword())) {
                return userService.startSession(admin);
            }
        }
        return "what";
    }
}
