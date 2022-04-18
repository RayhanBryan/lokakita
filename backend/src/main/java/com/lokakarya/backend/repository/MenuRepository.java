package com.lokakarya.backend.repository;

import java.util.Optional;

import com.lokakarya.backend.entity.Menu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu,Long>{
    public Optional<Menu> findByMenuName(String menuName);
}
