package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.PermissionGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PermissionGroupRepository extends JpaRepository<PermissionGroup,Long>{

    @Query(value = 
    "select * from permission_groups pg"+
    " LEFT JOIN GROUP_MENU gm on pg.GROUP_ID = gm.GROUP_ID"+
    " LEFT JOIN GROUPS g on gm.group_ID = g.GROUP_ID"+
    " LEFT JOIN HAK_AKSES ha on g.group_ID = ha.group_ID"+
    " LEFT JOIN USERS u on ha.user_ID = u.USER_ID"+
    " where u.user_id = :pUserId", nativeQuery = true)
    List<PermissionGroup> getPermissionGroupByUserId(@Param("pUserId") Long userId);
    
}
