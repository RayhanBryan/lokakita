package com.lokakarya.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.lokakarya.backend.entity.Country;

public interface CountryRepository extends JpaRepository<Country, String>{
	Page<Country> findByCountryNameContainingAllIgnoreCase(String countryName, Pageable paging);
	Page<Country> findAll(Pageable page);
	Page<Country> findByCountryNameContainingIgnoreCase(String countryName, Pageable paging);

	List<Country> findByCountryNameContainingIgnoreCase(String countryName);
	@Query(value = "SELECT * FROM COUNTRIES c  " +
            "LEFT JOIN " +
            "REGIONS r " +
            "ON c.REGION_ID= " +
            "r.REGION_ID WHERE " +
            "LOWER(r.REGION_NAME) " +
            "LIKE LOWER(CONCAT(CONCAT('%',:pRegionName), '%'))", nativeQuery = true)
    List<Country> findByRegionNameContainingIgnoreCase(@Param("pRegionName") String regionName);
}
