package com.cinema.cinemasystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinema.cinemasystem.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public List<User> findAll();

    public Optional<User> findById(Long id);

    public Optional<String> findBySession(String sessionId);

    public void deleteBySession(String sessionId);
}
