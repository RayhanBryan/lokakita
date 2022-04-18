package com.lokakarya.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lokakarya.backend.entity.Country;

public interface CountryRepository extends JpaRepository<Country, String>{
	Page<Country> findByCountryNameContainingAllIgnoreCase(String countryName, Pageable paging);
	
	Page<Country> findAll(Pageable page);
	
	Page<Country> findByCountryNameContainingIgnoreCase(String countryName, Pageable paging);
}
