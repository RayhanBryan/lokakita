package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.PermissionGroup;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionGroupRepository extends JpaRepository<PermissionGroup,Long>{
    
}
