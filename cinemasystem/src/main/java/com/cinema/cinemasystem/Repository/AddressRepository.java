package com.cinema.cinemasystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinema.cinemasystem.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    void delete(Address address);
}
