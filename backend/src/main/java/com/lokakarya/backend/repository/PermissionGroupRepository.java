package com.lokakarya.backend.repository;

import java.util.List;
import java.util.Optional;

import com.lokakarya.backend.entity.Group;
import com.lokakarya.backend.entity.Permission;
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
    List<PermissionGroup> getPermissionGroupByUser(@Param("pUserId") Long userId);

    @Query(value = 
    "select DISTINCT (pg.PERMISSION_GROUP_ID), pg.PERMISSION_ID, pg.GROUP_ID, pg.IS_ACTIVE from permission_groups pg"+
    " LEFT JOIN GROUP_MENU gm on pg.GROUP_ID = gm.GROUP_ID"+
    " LEFT JOIN GROUPS g on gm.group_ID = g.GROUP_ID"+
    " LEFT JOIN HAK_AKSES ha on g.group_ID = ha.group_ID"+
    " where pg.PERMISSION_ID = :pPermissionId and g.GROUP_ID = :pGroupId" , nativeQuery = true)
    Optional<PermissionGroup> getPermissionGroupByPermissionAndGroup(@Param("pPermissionId") Permission permissionId, @Param("pGroupId") Group groupId);

    
}
