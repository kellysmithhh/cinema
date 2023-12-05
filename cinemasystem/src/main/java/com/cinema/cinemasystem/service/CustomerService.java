package com.cinema.cinemasystem.service;

import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.AddressRepository;
import com.cinema.cinemasystem.Repository.CustomerRepository;
import com.cinema.cinemasystem.Repository.PaymentCardRepository;
import com.cinema.cinemasystem.dto.CreateBooking;
import com.cinema.cinemasystem.model.Address;
import com.cinema.cinemasystem.model.Booking;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.PaymentCard;
import com.cinema.cinemasystem.model.ShowInfo;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Autowired
    private MovieService movieService;

    @Autowired
    private EncryptionService encryptionService;

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

            Boolean promoEmail = editCustomer.getPromoEmail();
            realCustomer.setPromoEmail(promoEmail);

            Address shippingAddress = editCustomer.getShippingAddress();
            if (shippingAddress != null) {
                Address oldAddress = realCustomer.getShippingAddress();
                if (oldAddress != null) {
                    addressRepository.delete(oldAddress);
                }
                realCustomer.setShippingAddress(shippingAddress);
            }

            List<PaymentCard> paymentCards = editCustomer.getPaymentCards();
            if (paymentCards != null) {
                List<PaymentCard> currentCards = realCustomer.getPaymentCards();

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
                        card.setCustomer(realCustomer);
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

    public boolean checkPromotionsValue(Customer customer) {
        return customer.getPromoEmail();
    }

    public List<Customer> getAllPromoCustomers() {
        return customerRepository.findByPromoEmailIsTrue();
    }

    public Optional<Customer> getWithSession(String sessionId) {
        return customerRepository.findBySession(sessionId);
    }

    public List<Booking> getBookings(Customer customer) {
        return customer.getBookings();
    }

    public Optional<PaymentCard> getPaymentCardWithNumber(Customer customer, String cardNumber) {
        String encrypted = encryptionService.encrypt(cardNumber);
        List<PaymentCard> cards = paymentCardRepository.findAllByCardNumber(encrypted);
        for (PaymentCard card : cards) {
            if (card.getCustomer().equals(customer)) {
                return Optional.of(card);
            }
        }
        return Optional.empty();
    }

    @Transactional
    public Booking addBooking(Customer customer, CreateBooking booking) {
        Booking realBooking = new Booking();
        // booking number
        realBooking.setBookingNumber(booking.getBookingNumber());

        // credit card
        String cardNumber = booking.getCardNumber();
        Optional<PaymentCard> card = getPaymentCardWithNumber(customer, encryptionService.encrypt(cardNumber));
        if (card.isEmpty()) {
            System.out.println("CARD DOES NOT EXIST");
            return null;
        }
        realBooking.setCardNumber(cardNumber);

        // show info
        Optional<ShowInfo> maybeShowInfo = movieService.getInfoWithIdAndDateTime(booking.getMovieId(), booking.getDateTime());
        if (maybeShowInfo.isEmpty()) return null;
        ShowInfo showInfo = maybeShowInfo.get();
        realBooking.setShowInfo(showInfo);

        // tickets
        realBooking.setTickets(booking.getTickets());

        // customer save
        realBooking.setCustomer(customer);
        customerRepository.save(customer);

        return realBooking;
    }

}
