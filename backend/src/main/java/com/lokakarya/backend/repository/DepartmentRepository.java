package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Page<Department> findAll(Pageable page);

    Page<Department> findByDepartmentNameContainingIgnoreCase(String departmentName, Pageable paging);

    List<Department> findByDepartmentNameContainingIgnoreCase(String departmentName);

    @Query(value = "SELECT d.DEPARTMENT_ID,d.DEPARTMENT_NAME, l.LOCATION_ID, d.MANAGER_ID,l.STREET_ADDRESS,l.CITY FROM DEPARTMENTS d "
            +
            "LEFT JOIN " +
            "LOCATIONS l " +
            "ON d.LOCATION_ID= " +
            "l.LOCATION_ID WHERE LOWER(l.STREET_ADDRESS) LIKE LOWER(CONCAT(CONCAT('%', :pStreetAddress), '%'))", nativeQuery = true)
    List<Department> findByStreetAddressContainingIgnoreCase(@Param("pStreetAddress") String streetAddress);

    @Query(value = "SELECT * FROM DEPARTMENTS d " +
            "LEFT JOIN " +
            "LOCATIONS l " +
            "ON d.LOCATION_ID= " +
            "l.LOCATION_ID WHERE LOWER(l.STREET_ADDRESS) LIKE LOWER(CONCAT(CONCAT('%', :pCity), '%'))", nativeQuery = true)
    List<Department> findByCityContainingIgnoreCase(@Param("pCity") String city);
}
