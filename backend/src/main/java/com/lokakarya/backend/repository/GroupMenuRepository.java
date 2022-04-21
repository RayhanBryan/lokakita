package com.lokakarya.backend.repository;

import java.util.List;
import java.util.Optional;

import com.lokakarya.backend.entity.Group;
import com.lokakarya.backend.entity.GroupMenu;
import com.lokakarya.backend.entity.Menu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMenuRepository extends JpaRepository<GroupMenu, Long>{

    List<GroupMenu> findByGroup(Group group);
    
    Optional<GroupMenu> findByGroupAndMenu(Group group, Menu menu);
}
