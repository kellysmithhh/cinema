package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.cinemasystem.model.PaymentCard;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentCard, Long> {
    void delete(PaymentCard card);
}
