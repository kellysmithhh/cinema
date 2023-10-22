package com.cinema.cinemasystem.model;

import java.util.Set;

import com.cinema.cinemasystem.enums.STATUS;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class Customer extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private STATUS status;

    // single user can have many payment cards
    // each payment card can only be associated with one user
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<PaymentCard> paymentCards;

    // users can have only one shipping address
    // same shipping address can be shared by many users
    @ManyToOne(cascade = CascadeType.ALL)
    private Address shippingAddress;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Booking> bookings;

}
