package com.cinema.cinemasystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.cinema.cinemasystem.Repository.UserRepository;
import com.cinema.cinemasystem.model.User;

public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> getAll() {
        return repository.findAll();
    }

    public Optional<User> getWithId(Long id) {
        return repository.findById(id);
    }

    public Optional<User> getWithEmail(String email) {
        return repository.findByEmail(email);
    }

    public boolean register(User user) {
        repository.save(user);
        return true;
    }

}
