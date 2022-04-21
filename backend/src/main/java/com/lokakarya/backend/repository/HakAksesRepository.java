package com.lokakarya.backend.repository;

import java.util.List;
import java.util.Optional;

import com.lokakarya.backend.entity.Group;
import com.lokakarya.backend.entity.HakAkses;
import com.lokakarya.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HakAksesRepository extends JpaRepository<HakAkses, Long>{
    
    List<HakAkses> findByUser(User user);

    List<HakAkses> findByGroup(Group group);

    Optional<HakAkses> findByUserAndGroup (User user, Group group);
}
