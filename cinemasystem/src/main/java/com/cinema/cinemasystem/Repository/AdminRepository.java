package com.cinema.cinemasystem.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.cinemasystem.model.Admin;
import com.cinema.cinemasystem.model.User;

@Repository
public interface AdminRepository extends JpaRepository<User, Long> {
    public Optional<Admin> findByCode(String code);
}
