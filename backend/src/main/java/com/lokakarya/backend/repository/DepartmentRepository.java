package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Page<Department> findAll(Pageable page);
    Page<Department> findByDepartmentNameContainingIgnoreCase(String departmentName, Pageable paging);
}
