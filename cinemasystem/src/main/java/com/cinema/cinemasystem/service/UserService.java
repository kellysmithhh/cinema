package com.cinema.cinemasystem.service;

import java.io.ObjectInputFilter.Status;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cinema.cinemasystem.Repository.CustomerRepository;
import com.cinema.cinemasystem.Repository.UserRepository;
import com.cinema.cinemasystem.enums.STATUS;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.PaymentCard;
import com.cinema.cinemasystem.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder security;

    private String generateSessionId() {
        return UUID.randomUUID().toString();
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getWithId(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getWithSession(String session) {
        return userRepository.findBySession(session);
    }

    public boolean logout(Customer user) {
        user.setSession(null);
        user.setStatus(STATUS.INACTIVE);
        userRepository.save(user);
        return true;
    }

    public boolean register(Customer customer) {
        customer.setPassword(security.encode(customer.getPassword()));
        customer.setStatus(STATUS.INACTIVE);
        Set<PaymentCard> paymentCards = customer.getPaymentCards();
        if (paymentCards != null) {
            // encode card information
            for (PaymentCard card : paymentCards) {
                card.setCardName(Base64.getEncoder().encodeToString(card.getCardName().trim().getBytes()));
                card.setCardType(Base64.getEncoder().encodeToString(card.getCardType().trim().getBytes()));
                card.setCardNumber(Base64.getEncoder().encodeToString(card.getCardNumber().trim().getBytes()));
                card.setCardExpiration(Base64.getEncoder().encodeToString(card.getCardExpiration().trim().getBytes()));
                card.setCardCVV(Base64.getEncoder().encodeToString(card.getCardCVV().trim().getBytes()));
            }
        }
        customerRepository.save(customer);
        return true;
    }

    public boolean verify(String sessionId, String password) {
        Optional<Customer> maybeCustomer = customerRepository.findBySession(sessionId);
        if (maybeCustomer.isPresent()) {
            Customer customer = maybeCustomer.get();                    
            return security.matches(password, customer.getPassword());
        }       
        return false;
    }

    public boolean hasSession(String sessionId) {
        Optional<User> maybeUser = userRepository.findBySession(sessionId);
        return maybeUser.isPresent();
    }

    public String startSession(User user) {
        // generate session id that does not already exist
        // TODO ensure id does not already exist
        String sessionId = generateSessionId();
        // load session id for current customer
        user.setSession(sessionId);
        userRepository.save(user);
        return sessionId;
    }

    @Transactional
    public void closeSession(String sessionId) {
        if (hasSession(sessionId)) {
            userRepository.deleteBySession(sessionId);
        }
    }

    public void forgotPassword(String email, String password) {
        Optional<Customer> maybeCustomer = customerRepository.findByEmail(email);
        Customer customer = maybeCustomer.get();
        customer.setPassword(security.encode(password));
        customerRepository.save(customer);
    }

}
