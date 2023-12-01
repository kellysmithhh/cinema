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
import com.cinema.cinemasystem.Repository.MovieRepository;
import com.cinema.cinemasystem.Repository.ShowInfoRepository;
import com.cinema.cinemasystem.dto.CreateBooking;
import com.cinema.cinemasystem.model.Address;
import com.cinema.cinemasystem.model.Booking;
import com.cinema.cinemasystem.model.Customer;
import com.cinema.cinemasystem.model.Movie;
import com.cinema.cinemasystem.model.PaymentCard;
import com.cinema.cinemasystem.model.ShowInfo;
import com.cinema.cinemasystem.model.Ticket;

import jakarta.transaction.Transactional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ShowInfoRepository showInfoRepository;

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

    @Transactional
    public Booking addBooking(Customer customer, CreateBooking booking) {
        Booking realBooking = new Booking();
        realBooking.setBookingNumber(booking.getBookingNumber());

        Optional<Movie> maybeMovie = movieRepository.findById(booking.getMovie());
        if (maybeMovie.isEmpty()) {
            // movie with that id does not exist
            return null;
        }
        Movie movie = maybeMovie.get();

        realBooking.setMovie(movie);

        List<Ticket> tickets = booking.getTickets();
        for (Ticket ticket : tickets) {
            ticket.setBooking(realBooking);
        }
        realBooking.setTickets(tickets);

        // ShowInfo showInfo = booking.getShowInfo();
        // showInfo.setMovie(movie);
        // showInfoRepository.save(showInfo);
        // realBooking.setShow(showInfo);

        List<Booking> bookings = customer.getBookings();
        bookings.add(realBooking);
        customer.setBookings(bookings);

        realBooking.setCustomer(customer);
        customerRepository.save(customer);

        return realBooking;
    }

}
