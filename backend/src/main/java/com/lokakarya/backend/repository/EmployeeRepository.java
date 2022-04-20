package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Page<Employee> findAll(Pageable page);
    Page<Employee> findByFirstNameContainingIgnoreCase(String firstName, Pageable paging);
    List<Employee> findByFirstNameContainingIgnoreCase(String firstName);
}
