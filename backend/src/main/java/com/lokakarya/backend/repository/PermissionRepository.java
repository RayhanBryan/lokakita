package com.lokakarya.backend.repository;

import java.util.List;
import java.util.Optional;

import com.lokakarya.backend.entity.Permission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PermissionRepository extends JpaRepository<Permission,Long>{
    @Query(value = 
    "select distinct (p.PERMISSION_ID), p.PERMISSION, p.NOTE from permissions p"+
    " LEFT JOIN PERMISSION_GROUPS pg on p.PERMISSION_ID = pg.PERMISSION_ID"+
    " LEFT JOIN GROUPS g on pg.GROUP_ID = g.GROUP_ID"+
    " LEFT JOIN HAK_AKSES ha on g.GROUP_ID = ha.GROUP_ID"+
    " LEFT JOIN USERS u on ha.USER_ID = u.USER_ID"+
    " where u.USER_ID = :pUserId AND ha.IS_ACTIVE = 'Y' AND pg.IS_ACTIVE = 'Y'"+
    " order by p.PERMISSION_ID", nativeQuery = true)
    List<Permission> getPermissionByUserId(@Param("pUserId") Long userId);

    Optional<Permission> getByPermission(String permission);
}
