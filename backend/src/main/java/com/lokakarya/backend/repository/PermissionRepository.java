package com.lokakarya.backend.repository;

import java.util.List;

import com.lokakarya.backend.entity.Permission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PermissionRepository extends JpaRepository<Permission,Long>{
    @Query(value = 
    "select * from permissions p"+
    " LEFT JOIN PERMISSION_GROUPS pg on p.PERMISSION_ID = pg.PERMISSION_ID"+
    " LEFT JOIN GROUPS g on pg.group_ID = g.GROUP_ID"+
    " LEFT JOIN HAK_AKSES ha on g.group_ID = ha.group_ID"+
    " LEFT JOIN USERS u on ha.user_ID = u.USER_ID"+
    " where u.user_id = :pUserId", nativeQuery = true)
    List<Permission> getPermissionByUserId(@Param("pUserId") Long userId);
}
