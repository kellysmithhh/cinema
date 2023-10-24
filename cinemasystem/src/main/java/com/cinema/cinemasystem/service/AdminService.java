package com.cinema.cinemasystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.AdminRepository;
import com.cinema.cinemasystem.model.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;

    public Optional<Admin> getWithCode(String code) {
        return repository.findByCode(code);
    }

}
