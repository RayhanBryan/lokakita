package com.lokakarya.backend.repository;

import java.util.Optional;

import com.lokakarya.backend.entity.Group;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group,Long>{
    Optional<Group> findByGroupName(String groupName);
}
