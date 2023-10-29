package com.cinema.cinemasystem.service;

import java.util.Base64;
import java.util.Objects;
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
        if (firstName != null) {
            realCustomer.setFirstName(firstName);
        }
        
        String lastName = editCustomer.getLastName();
        if (lastName != null) {
            realCustomer.setLastName(lastName);
        }
        
        String password = editCustomer.getPassword();
        if (password != null) {
            realCustomer.setPassword(security.encode(password));
        }
        
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
            Set<PaymentCard> currentCards = realCustomer.getPaymentCards();
            
            for (PaymentCard card : paymentCards) {
                PaymentCard matchingCard = currentCards.stream()
                            .filter(c -> {
                                boolean isMatching = Objects.equals(c.getId(), card.getId());
                                if (!isMatching) {
                                    System.out.println("c.getId(): " + c.getId());
                                    System.out.println("card.getId(): " + card.getId());
                                }
                                return isMatching;
                            })
                            .findFirst()
                            .orElse(null);
                
                if (matchingCard != null) {
                    // Modify existing card
                    matchingCard.setCardName(security.encode(card.getCardName()));
                    matchingCard.setCardCVV(security.encode(card.getCardCVV()));
                    matchingCard.setCardNumber(security.encode(card.getCardNumber()));
                    matchingCard.setBillingAddress(card.getBillingAddress());
                    matchingCard.setCardExpiration(security.encode(card.getCardExpiration()));
                    matchingCard.setCardType(security.encode(card.getCardType()));

                    matchingCard.setCardName(Base64.getEncoder().encodeToString(card.getCardName().trim().getBytes()));
                    matchingCard.setCardType(Base64.getEncoder().encodeToString(card.getCardType().trim().getBytes()));
                    matchingCard.setCardNumber(Base64.getEncoder().encodeToString(card.getCardNumber().trim().getBytes()));
                    matchingCard.setCardExpiration(Base64.getEncoder().encodeToString(card.getCardExpiration().trim().getBytes()));
                    matchingCard.setCardCVV(Base64.getEncoder().encodeToString(card.getCardCVV().trim().getBytes()));
                } else if (currentCards.size() != 3) {
                    // Add a new card
                    card.setCardName(Base64.getEncoder().encodeToString(card.getCardName().trim().getBytes()));
                    card.setCardType(Base64.getEncoder().encodeToString(card.getCardType().trim().getBytes()));
                    card.setCardNumber(Base64.getEncoder().encodeToString(card.getCardNumber().trim().getBytes()));
                    card.setCardExpiration(Base64.getEncoder().encodeToString(card.getCardExpiration().trim().getBytes()));
                    card.setCardCVV(Base64.getEncoder().encodeToString(card.getCardCVV().trim().getBytes()));
                    realCustomer.getPaymentCards().add(card);
                    card.setUser(realCustomer);
                } else {
                    System.out.println("Already have 3 cards");
                }
            } // for
        } // if
        
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
