package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.Group;
import com.lokakarya.backend.entity.GroupMenu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMenuRepository extends JpaRepository<GroupMenu, Long>{

    List<GroupMenu> findByGroup(Group group);
    
}
