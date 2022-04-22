package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.Region;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

public interface RegionRepository extends JpaRepository<Region, Long>{
	Page<Region> findAll(Pageable page);
	Page<Region> findByRegionNameContainingIgnoreCase(String regionName, Pageable paging);
	List<Region> findByRegionNameContainingIgnoreCase(String regionName);
	
	// @Query(value = "SELECT * FROM REGIONS r WHERE REGIONS r.region_name LIKE LOWER(CONCAT(CONCAT('%', :pRegionName), '%'))", nativeQuery = true)
    // String findByRegionNameIgnoreCase(@Param("pRegionName") String regionName);
	
}