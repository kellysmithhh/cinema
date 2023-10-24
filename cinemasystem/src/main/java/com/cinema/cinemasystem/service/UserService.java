package com.cinema.cinemasystem.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.CustomerRepository;
import com.cinema.cinemasystem.Repository.UserRepository;
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

    public boolean register(Customer customer) {
        customer.setPassword(security.encode(customer.getPassword()));
        Set<PaymentCard> paymentCards = customer.getPaymentCards();
        if (paymentCards != null) {
            // encode card information
            for (PaymentCard card : paymentCards) {
                card.setCardName(security.encode(card.getCardName()));
                card.setCardType(security.encode(card.getCardType()));
                card.setCardNumber(security.encode(card.getCardNumber()));
                card.setCardExpiration(security.encode(card.getCardExpiration()));
                card.setCardCVV(security.encode(card.getCardCVV()));
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

    public boolean editProfile(Customer editCustomer) {
        Optional<Customer> maybeCustomer = customerRepository.findBySession(editCustomer.getSession());
        if (maybeCustomer.isPresent()) {
            Customer realCustomer = maybeCustomer.get();
            String firstName = editCustomer.getFirstName();
            if (firstName != null) realCustomer.setFirstName(firstName);
            String lastName = editCustomer.getLastName();
            if (lastName != null) realCustomer.setLastName(lastName);
            String password = editCustomer.getPassword();
            if (password != null) realCustomer.setPassword(password);
            Set<PaymentCard> paymentCards = editCustomer.getPaymentCards();
            if (paymentCards != null) realCustomer.setPaymentCards(paymentCards);
            customerRepository.save(realCustomer);
            return true;
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

    public void closeSession(String sessionId) {
        if (hasSession(sessionId)) {
            userRepository.deleteBySession(sessionId);
        }
    }

}
