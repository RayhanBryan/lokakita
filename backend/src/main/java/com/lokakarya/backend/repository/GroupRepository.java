package com.lokakarya.backend.repository;

import java.util.List;
import java.util.Optional;

import com.lokakarya.backend.entity.Group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GroupRepository extends JpaRepository<Group,Long>{
    Optional<Group> findByGroupName(String groupName);

    Group getByGroupName(String groupName);

    @Query(value = "select * from GROUPS g" +
    " left JOIN HAK_AKSES ha on g.group_ID = ha.group_ID" + 
    " LEFT JOIN USERS u on ha.user_ID = u.user_ID" +
    " where u.user_Id = :pUserId and ha.is_active = 'Y'"+
    " order by g.group_ID asc",nativeQuery = true)
    List<Group> getGroupByUserId(@Param("pUserId") Long userId);
}
