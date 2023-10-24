package com.cinema.cinemasystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.cinemasystem.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public List<User> findAll();

    public Optional<User> findById(Long id);

    public Optional<User> findBySession(String sessionId);

    public void deleteBySession(String sessionId);
}
