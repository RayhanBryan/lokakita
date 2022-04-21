package com.lokakarya.backend.repository;

import java.util.List;
import java.util.Optional;

import com.lokakarya.backend.entity.Menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuRepository extends JpaRepository<Menu,Long>{
    public Optional<Menu> findByMenuName(String menuName);

    @Query(value = "SELECT"+
    " Distinct (m.MENU_ID), m.MENU_NAME, m.ICON, URL, m.PROGRAM_NAME, m.CREATED_DATE, m.CREATED_BY, m.UPDATED_DATE, m.UPDATED_BY from menus m" +
    " LEFT JOIN GROUP_MENU gm on m.menu_id = gm.MENU_ID"+
    " LEFT JOIN Groups gs on gm.group_id = gs.group_ID"+
    " LEFT JOIN HAK_AKSES ha on gs.group_id = ha.group_ID"+ 
    " LEFT JOIN USERS u on ha.user_id = u.user_ID" +
    " where u.USER_ID = :pUserId and gm.IS_ACTIVE='Y'" +
    " ORDER BY m.MENU_ID ASC", nativeQuery = true)
    List<Menu> findMenuByUserId (@Param("pUserId") Long userId);

    @Query(value = "SELECT"+
    " Distinct (m.MENU_ID), m.MENU_NAME, m.ICON, URL, m.PROGRAM_NAME, m.CREATED_DATE, m.CREATED_BY, m.UPDATED_DATE, m.UPDATED_BY from menus m" +
    " LEFT JOIN GROUP_MENU gm on m.menu_id = gm.MENU_ID"+
    " LEFT JOIN Groups gs on gm.group_id = gs.group_ID"+
    " LEFT JOIN HAK_AKSES ha on gs.group_id = ha.group_ID"+ 
    " LEFT JOIN USERS u on ha.user_id = u.user_ID" +
    " where u.USER_ID = :pUserId and ha.IS_ACTIVE='Y' and gm.IS_ACTIVE='Y'" +
    " ORDER BY m.MENU_ID ASC", nativeQuery = true)
    List<Menu> findMenuByUserIdAndActive (@Param("pUserId") Long userId);

    @Query(value = "SELECT *"+
    " FROM MENUS m" +
    " LEFT JOIN GROUP_MENU gm ON m.MENU_ID = gm.MENU_ID"+
    " LEFT JOIN GROUPS g ON g.GROUP_ID = gm.GROUP_ID"+
    " WHERE g.GROUP_ID = GROUP_ID AND gm.IS_ACTIVE='Y'"+
    " ORDER BY m.MENU_ID ASC"
    , nativeQuery = true)
    List<Menu> findMenuByGroupId(@Param("pGroupId")Long groupId);
}
