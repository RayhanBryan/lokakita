package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.Region;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long>{
	Page<Region> findAll(Pageable page);
	Page<Region> findByRegionNameContainingIgnoreCase(String regionName, Pageable paging);
	List<Region> findByRegionNameContainingIgnoreCase(String regionName);
	
}