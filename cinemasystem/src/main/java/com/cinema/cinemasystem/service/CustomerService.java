package com.cinema.cinemasystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.CustomerRepository;
import com.cinema.cinemasystem.model.Customer;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository repository;

    public Optional<Customer> getWithEmail(String email) {
        return repository.findByEmail(email);
    }

}
