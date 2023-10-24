package com.cinema.cinemasystem.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
        customerRepository.save(customer);
        return true;
    }

    public boolean editProfile(Customer inputCustomer) {
        Optional<Customer> maybeCustomer = customerRepository.findBySession(inputCustomer.getSession());
        if (maybeCustomer.isPresent()) {
            Customer realCustomer = maybeCustomer.get();
            if (inputCustomer.getSession().equals(realCustomer.getSession())) {
                String firstName = inputCustomer.getFirstName();
                if (firstName != null) realCustomer.setFirstName(firstName);
                String lastName = inputCustomer.getLastName();
                if (lastName != null) realCustomer.setLastName(lastName);
                String password = inputCustomer.getPassword();
                if (password != null) realCustomer.setPassword(password);
                Set<PaymentCard> paymentCards = inputCustomer.getPaymentCards();
                if (paymentCards != null) realCustomer.setPaymentCards(paymentCards);
                customerRepository.save(realCustomer);
                return true;
            }
        }
        return false;
    }

    public boolean hasSession(String sessionId) {
        Optional<User> maybeUser = userRepository.findBySession(sessionId);
        return maybeUser.isPresent();
    }

    public void startSession(Customer customer) {
        // generate session id that does not already exist
        // TODO ensure id does not already exist
        String sessionId = generateSessionId();
        // load session id for current customer
        customer.setSession(sessionId);
        userRepository.save(customer);
    }

    public void closeSession(String sessionId) {
        if (hasSession(sessionId)) {
            userRepository.deleteBySession(sessionId);
        }
    }

}
