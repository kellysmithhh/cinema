package com.cinema.cinemasystem.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinema.cinemasystem.Repository.AddressRepository;
import com.cinema.cinemasystem.Repository.BookingRepository;
import com.cinema.cinemasystem.Repository.CustomerRepository;
import com.cinema.cinemasystem.Repository.MovieRepository;
import com.cinema.cinemasystem.Repository.PaymentCardRepository;
import com.cinema.cinemasystem.Repository.ShowInfoRepository;
import com.cinema.cinemasystem.Repository.TicketRepository;
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
    private PaymentCardRepository paymentCardRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowInfoRepository showInfoRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TicketRepository ticketRepository;

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
                        // matchingCard.setCardName(security.encode(card.getCardName()));
                        // matchingCard.setCardCVV(security.encode(card.getCardCVV()));
                        // matchingCard.setCardNumber(security.encode(card.getCardNumber()));
                        // matchingCard.setBillingAddress(card.getBillingAddress());
                        // matchingCard.setCardExpiration(security.encode(card.getCardExpiration()));
                        // matchingCard.setCardType(security.encode(card.getCardType()));

                        // matchingCard.setCardName(Base64.getEncoder().encodeToString(card.getCardName().trim().getBytes()));
                        // matchingCard.setCardType(Base64.getEncoder().encodeToString(card.getCardType().trim().getBytes()));
                        // matchingCard.setCardNumber(Base64.getEncoder().encodeToString(card.getCardNumber().trim().getBytes()));
                        // matchingCard.setCardExpiration(Base64.getEncoder().encodeToString(card.getCardExpiration().trim().getBytes()));
                        // matchingCard.setCardCVV(Base64.getEncoder().encodeToString(card.getCardCVV().trim().getBytes()));
                        matchingCard.setCardName(encryptionService.encrypt(card.getCardName()));
                        matchingCard.setCardCVV(encryptionService.encrypt(card.getCardCVV()));
                        matchingCard.setCardNumber(encryptionService.encrypt(card.getCardNumber()));
                        matchingCard.setBillingAddress(card.getBillingAddress());
                        matchingCard.setCardExpiration(encryptionService.encrypt(card.getCardExpiration()));
                        matchingCard.setCardType(encryptionService.encrypt(card.getCardType()));
                    } else if (currentCards.size() != 3) {
                        // Add a new card
                        // card.setCardName(Base64.getEncoder().encodeToString(card.getCardName().trim().getBytes()));
                        // card.setCardType(Base64.getEncoder().encodeToString(card.getCardType().trim().getBytes()));
                        // card.setCardNumber(Base64.getEncoder().encodeToString(card.getCardNumber().trim().getBytes()));
                        // card.setCardExpiration(Base64.getEncoder().encodeToString(card.getCardExpiration().trim().getBytes()));
                        // card.setCardCVV(Base64.getEncoder().encodeToString(card.getCardCVV().trim().getBytes()));

                        card.setCardName(encryptionService.encrypt(card.getCardName()));
                        card.setCardCVV(encryptionService.encrypt(card.getCardCVV()));
                        card.setCardNumber(encryptionService.encrypt(card.getCardNumber()));
                        card.setBillingAddress(card.getBillingAddress());
                        card.setCardExpiration(encryptionService.encrypt(card.getCardExpiration()));
                        card.setCardType(encryptionService.encrypt(card.getCardType()));

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
        List<Booking> bookings = customer.getBookings();
        for (Booking booking : bookings) {
            booking.setCardNumber(encryptionService.decrypt(booking.getCardNumber()));
        }
        return bookings;
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
    public String addBooking(Customer customer, CreateBooking booking) {
        Booking realBooking = new Booking();
        bookingRepository.save(realBooking);
        // booking number
        realBooking.setBookingNumber(booking.getBookingNumber());

        // credit card
        String cardNumber = booking.getCardNumber();
        Optional<PaymentCard> card = getPaymentCardWithNumber(customer, cardNumber);
        if (card.isEmpty()) return "card does not exist";
        realBooking.setCardNumber(encryptionService.encrypt(cardNumber));

        // show info
        Optional<Movie> maybeMovie = movieRepository.findById(booking.getMovieId());
        if (maybeMovie.isEmpty()) return "movie does not exist";

        Optional<ShowInfo> maybeShowInfo = showInfoRepository.findByMovieAndDateTime(maybeMovie.get(), booking.getDateTime());
        if (maybeShowInfo.isEmpty()) return "show info does not exist";
        ShowInfo showInfo = maybeShowInfo.get();
        realBooking.setShowInfo(showInfo);

        // tickets
        List<Ticket> tickets = new ArrayList<>();
        for (Ticket ticket : booking.getTickets()) {
            ticket.setBooking(realBooking);
            Ticket realTicket = ticketRepository.save(ticket);
            tickets.add(realTicket);
        }
        realBooking.setTickets(tickets);

        // customer
        realBooking.setCustomer(customer);
        customer.getBookings().add(realBooking);

        bookingRepository.save(realBooking);
        customerRepository.save(customer);
        return "booking create success";
    }

}
