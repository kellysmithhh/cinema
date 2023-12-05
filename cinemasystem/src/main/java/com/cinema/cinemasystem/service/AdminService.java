package com.cinema.cinemasystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.AdminRepository;
import com.cinema.cinemasystem.model.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;

    @Autowired
    private PasswordEncoder security;

    public Optional<Admin> getWithCode(String code) {
        return repository.findByCode(code);
    }

    public void deleteAll() {
        repository.deleteAll();
    }

    public void autoCreate(String first, String last, String code, String password) {
        Optional<Admin> maybeAdmin = repository.findByCode(code);
        if (maybeAdmin.isPresent()) return;

        Admin newAdmin = new Admin();
        newAdmin.setFirstName(first);
        newAdmin.setLastName(last);
        newAdmin.setCode(code);
        newAdmin.setPassword(security.encode(password));
        repository.save(newAdmin);
    }

}
