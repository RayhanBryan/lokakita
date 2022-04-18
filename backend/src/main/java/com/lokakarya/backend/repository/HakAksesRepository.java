package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.HakAkses;
import com.lokakarya.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HakAksesRepository extends JpaRepository<HakAkses, Long>{
    
    List<HakAkses> findByUser(User user);
}
