package com.cinema.cinemasystem.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.AddressRepository;
import com.cinema.cinemasystem.Repository.CustomerRepository;
import com.cinema.cinemasystem.model.Address;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.PaymentCard;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PasswordEncoder security;

    public Optional<Customer> getWithEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    @Transactional
    public boolean editProfile(Customer editCustomer) {
        Optional<Customer> maybeCustomer = customerRepository.findBySession(editCustomer.getSession());
        if (maybeCustomer.isPresent()) {
            Customer realCustomer = maybeCustomer.get();
            String firstName = editCustomer.getFirstName();
            if (firstName != null) realCustomer.setFirstName(firstName);
            String lastName = editCustomer.getLastName();
            if (lastName != null) realCustomer.setLastName(lastName);
            String password = editCustomer.getPassword();
            if (password != null) realCustomer.setPassword(security.encode(password));
            Address shippingAddress = editCustomer.getShippingAddress();
            if (shippingAddress != null) {
                Address oldAddress = realCustomer.getShippingAddress();
                if (oldAddress != null) {
                    addressRepository.delete(oldAddress);
                }
                realCustomer.setShippingAddress(shippingAddress);
            }
            Set<PaymentCard> paymentCards = editCustomer.getPaymentCards();
            if (paymentCards != null) {
                realCustomer.getPaymentCards().clear();
                for (PaymentCard card : paymentCards) {
                    card.setCardName(security.encode(card.getCardName()));
                    card.setCardType(security.encode(card.getCardType()));
                    card.setCardNumber(security.encode(card.getCardNumber()));
                    card.setCardExpiration(security.encode(card.getCardExpiration()));
                    card.setCardCVV(security.encode(card.getCardCVV()));
                    realCustomer.getPaymentCards().add(card);
                    card.setUser(realCustomer);
                }
            }
            customerRepository.save(realCustomer);
            return true;
        }
        return false;
    }

    public boolean checkPromotionsValue(String sessionId) {
        Optional<Customer> maybeCustomer = customerRepository.findBySession(sessionId);
        System.out.println("sessionId on backend: " + sessionId);
        if (maybeCustomer.isPresent()) {
            Customer customer = maybeCustomer.get();
            return customer.getPromoEmail();
        } else {
            System.out.println("maybe customer not present.");
            return false;
        }
    }

    public Customer getWithSesssion(String sessionId) {
        return customerRepository.findBySession(sessionId).orElse(null);
    }

}
