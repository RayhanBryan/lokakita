package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Page<Department> findAll(Pageable page);
//    Page<Department> findByDepartmentNamePaginationContainingIgnoreCase(String departmentName, Pageable paging);
    List<Department> findByDepartmentNameContainingIgnoreCase(String departmentName);
}
