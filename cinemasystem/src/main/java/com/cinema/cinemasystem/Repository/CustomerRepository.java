package com.cinema.cinemasystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.cinemasystem.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    public List<Customer> findAll();

    public Optional<Customer> findById(Long id);

    public Optional<Customer> findByEmail(String email);

    public Optional<Customer> findBySession(String sessionId);

    public List<Customer> findByPromoEmailIsTrue();
}
