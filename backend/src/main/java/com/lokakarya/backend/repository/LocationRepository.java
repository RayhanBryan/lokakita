package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {

    Page<Location> findAll(Pageable page);
    List<Location> findByStreetAddressContainingIgnoreCase(String streetAddress);
    Page<Location> findBystreetAddressContainingIgnoreCase(String streetAddress, Pageable paging);
    List<Location> findByCityContainingIgnoreCase(String city);
}
