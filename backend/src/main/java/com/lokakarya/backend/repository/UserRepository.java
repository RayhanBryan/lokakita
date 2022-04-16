package com.lokakarya.backend.repository;

import java.util.Optional;

import com.lokakarya.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByUsernameContainingIgnoreCase(String username);
}
