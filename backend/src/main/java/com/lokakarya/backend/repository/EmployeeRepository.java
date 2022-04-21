package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

        Page<Employee> findAll(Pageable page);

        Page<Employee> findByFirstNameContainingIgnoreCase(String firstName, Pageable paging);

        // Search by Full Name
        List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName,
                        String lastName);

        default List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String fullName) {
                return findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(fullName, fullName);
        }

        @Query(value = "SELECT * FROM EMPLOYEES e " +
                        "LEFT JOIN " +
                        "JOBS j " +
                        "ON j.JOB_ID = " +
                        "e.JOB_ID " +
                        "LEFT JOIN DEPARTMENTS d " +
                        "ON d.DEPARTMENT_ID = e.DEPARTMENT_ID " +
                        "WHERE " +
                        "LOWER(j.JOB_TITLE) " +
                        "LIKE LOWER(CONCAT(CONCAT('%',:pJobTitle),'%'))", nativeQuery = true)
        List<Employee> getByAllContainingIgnoreCase(@Param("pJobTitle") String jobTitle);

        @Query(value = "SELECT * FROM EMPLOYEES e " +
                        "LEFT JOIN " +
                        "JOBS j " +
                        "ON j.JOB_ID = " +
                        "e.JOB_ID " +
                        "LEFT JOIN DEPARTMENTS d " +
                        "ON d.DEPARTMENT_ID = e.DEPARTMENT_ID " +
                        "WHERE " +
                        "LOWER(j.JOB_TITLE) " +
                        "LIKE LOWER(CONCAT(CONCAT('%',:pJobTitle),'%'))", nativeQuery = true)
        List<Employee> getByJobTitleContainingIgnoreCase(@Param("pJobTitle") String jobTitle);

        List<Employee> findByEmailContainingIgnoreCase(String email);

        @Query(value = "SELECT * FROM EMPLOYEES e  " +
                        "LEFT JOIN " +
                        "DEPARTMENTS d " +
                        "ON e.DEPARTMENT_ID= " +
                        "d.DEPARTMENT_ID WHERE " +
                        "LOWER(d.DEPARTMENT_NAME) " +
                        "LIKE LOWER(CONCAT(CONCAT('%',:pDepartmentName), '%'))", nativeQuery = true)
        List<Employee> findByDepartmentNameContainingIgnoreCase(@Param("pDepartmentName") String departmentName);

        List<Employee> getByManager(Employee manager);
}
