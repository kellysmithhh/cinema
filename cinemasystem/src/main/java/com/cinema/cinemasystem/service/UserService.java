package com.cinema.cinemasystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.CustomerRepository;
import com.cinema.cinemasystem.Repository.UserRepository;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getWithId(Long id) {
        return userRepository.findById(id);
    }

    public boolean register(Customer customer) {
        customerRepository.save(customer);
        return true;
    }

}
