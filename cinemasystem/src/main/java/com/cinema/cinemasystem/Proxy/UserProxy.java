package com.cinema.cinemasystem.Proxy;

// import java.util.Base64;
import java.util.List;
import java.util.Optional;
// import java.util.Base64.Decoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinema.cinemasystem.dto.CreateBooking;
import com.cinema.cinemasystem.enums.STATUS;
import com.cinema.cinemasystem.model.Admin;
import com.cinema.cinemasystem.model.Booking;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.PaymentCard;
import com.cinema.cinemasystem.model.User;
import com.cinema.cinemasystem.service.AdminService;
import com.cinema.cinemasystem.service.CustomerService;
import com.cinema.cinemasystem.service.EncryptionService;
import com.cinema.cinemasystem.service.UserService;

@Component
public class UserProxy {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder security;

    @Autowired
    private EncryptionService encryptionService;

    public String register(Customer customer) {
        // Additional logic or validation can be added here
        Optional<Customer> existingCustomer = customerService.getWithEmail(customer.getEmail());
        if (existingCustomer.isPresent()) {
            return "user already exists with same email";
        } else {
            userService.register(customer);
            return "new user registered";
        }
    }

    public String customerLogin(String email, String password) {
        Optional<Customer> maybeCustomer = customerService.getWithEmail(email);
        if (maybeCustomer.isPresent()) {
            Customer customer = maybeCustomer.get();
            if (security.matches(password, customer.getPassword())) {
                customer.setStatus(STATUS.ACTIVE);
                return userService.startSession(customer);
            }
        }
        return null;
    }

    public String adminLogin(String adminId, String password) {
        Optional<Admin> maybeAdmin = adminService.getWithCode(adminId);
        if (maybeAdmin.isPresent()) {
            Admin admin = maybeAdmin.get();
            // TODO check if user session already exists
            if (security.matches(password, admin.getPassword())) {
                return userService.startSession(admin);
            }
        }
        return null;
    }

    public String logout(String sessionId) {
        Optional<User> maybeUser = userService.getWithSession(sessionId);
        if (maybeUser.isPresent()) {
            return userService.logout(maybeUser.get());
        } else {
            return "invalid request";
        }
    }

    public boolean verify(@PathVariable String sessionId, @PathVariable String password) {
        System.out.println(userService.verify(sessionId, password));
        return userService.verify(sessionId, password);
    }

    public boolean authenticate(@PathVariable String sessionId) {
        return userService.hasSession(sessionId);
    }

    public boolean editProfile(@RequestBody Customer customer) {
        return customerService.editProfile(customer);
    }

    public void changePassword(@PathVariable String email, @PathVariable String password) {
        userService.forgotPassword(email, password);
    }

    public boolean checkPromotionsValue(@PathVariable String sessionId) {
        Optional<Customer> maybeCustomer = customerService.getWithSession(sessionId);
        if (maybeCustomer.isEmpty()) return false;
        return customerService.checkPromotionsValue(maybeCustomer.get());
    }

    public String getFname(@PathVariable String sessionId) {
        Optional<User> maybeUser = userService.getWithSession(sessionId);
        if (maybeUser.isEmpty()) return "invalid request";
        return maybeUser.get().getFirstName();
    }

    public String getLname(@PathVariable String sessionId) {
        Optional<User> maybeUser = userService.getWithSession(sessionId);
        if (maybeUser.isEmpty()) return "invalid request";
        return maybeUser.get().getLastName();
    }

    public String getPhone(@PathVariable String sessionId) {
        Optional<Customer> maybeCustomer = customerService.getWithSession(sessionId);
        if (maybeCustomer.isPresent()) {
            return maybeCustomer.get().getPhone();
        } else {
            return "invalid request";
        }
    }

     public List<PaymentCard> getPaymentCards(@PathVariable String sessionId) {
        Optional<Customer> maybeCustomer = customerService.getWithSession(sessionId);
        if (maybeCustomer.isPresent()) {
            return maybeCustomer.get().getPaymentCards();
        } else {
            return List.of(); // empty set
        }
    }

     public Customer getCustomer(@PathVariable String sessionId) {
        Optional<Customer> maybeCustomer = customerService.getWithSession(sessionId);
        if (maybeCustomer.isEmpty()) {
            return null;
        }
        Customer customer = maybeCustomer.get();
        // Decoder decoder = Base64.getDecoder();
        // for (PaymentCard card : customer.getPaymentCards()) {
        //     String cardType = new String (decoder.decode(card.getCardType()));
        //     card.setCardType(cardType);

        //     String cardCVV = new String (decoder.decode(card.getCardCVV()));
        //     card.setCardCVV(cardCVV);

        //     String cardExp = new String (decoder.decode(card.getCardExpiration()));
        //     card.setCardExpiration(cardExp);

        //     String cardName = new String (decoder.decode(card.getCardName()));
        //     card.setCardName(cardName);

        //     String cardNum = new String (decoder.decode(card.getCardNumber()));
        //     card.setCardNumber(cardNum);
        // }
        for (PaymentCard card : customer.getPaymentCards()) {
            card.setCardType(encryptionService.decrypt(card.getCardType()));
            card.setCardCVV(encryptionService.decrypt(card.getCardCVV()));
            card.setCardExpiration(encryptionService.decrypt(card.getCardExpiration()));
            card.setCardName(encryptionService.decrypt(card.getCardName()));
            card.setCardNumber(encryptionService.decrypt(card.getCardNumber()));
        }
        return customer;
    }

    public List<Booking> getBookings(String sessionId) {
        Optional<Customer> maybeCustomer = customerService.getWithSession(sessionId);
        if (maybeCustomer.isEmpty()) return List.of();
        return customerService.getBookings(maybeCustomer.get());
    }

    public String addBooking(String sessionId, CreateBooking booking) {
        Optional<Customer> maybeCustomer = customerService.getWithSession(sessionId);
        if (maybeCustomer.isEmpty()) return "customer does not exist";
        return customerService.addBooking(maybeCustomer.get(), booking);
    }
}