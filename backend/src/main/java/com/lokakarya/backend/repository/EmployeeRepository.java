package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Page<Employee> findAll(Pageable page);

    Page<Employee> findByFirstNameContainingIgnoreCase(String firstName, Pageable paging);

    List<Employee> findByFirstName(String firstName);

    List<Employee> findByFirstNameContaining(String firstName);

    List<Employee> findByFirstNameOrLastName(String firstName, String lastName);

    List<Employee> findByFirstNameContainingOrLastNameContainingAllIgnoreCase(String firstName, String lastName);

    Page<Employee> findByFirstNameContaining(String firstName, Pageable paging);

    @Query("SELECT e FROM Employees e "
            + "WHERE LOWER(e.firstName) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Employee> findByFirstNameWithJpqlIndexedQueryParam(String firstName);

    @Query("SELECT e FROM Employees e "
            + "WHERE LOWER(e.firstName) LIKE LOWER(CONCAT('%', ?1, '%'))")
    Page<Employee> findByFirstNameWithJpqlIndexedQueryParam(String firstName, Pageable paging);

    @Query("SELECT e FROM Employees e "
            + "WHERE LOWER(e.firstName) LIKE LOWER(CONCAT('%', :pFirstName, '%'))")
    Page<Employee> findByFirstNameWithJpqlNamedParam(@Param("pFirstName") String firstName, Pageable paging);

    @Query(value =  "SELECT * FROM EMPLOYEES e WHERE LOWER(e.FIRST_NAME) LIKE LOWER(CONCAT(CONCAT('%', ?1), '%'))", nativeQuery = true)
    List<Employee> findByFirstNameWithNativeIndexedQueryParam(String firstName);

    @Query(value =  "SELECT * FROM EMPLOYEES e WHERE LOWER(e.FIRST_NAME) LIKE LOWER(CONCAT(CONCAT('%', ?1), '%'))",
            countQuery = "SELECT count(*) FROM EMPLOYEES e WHERE LOWER(e.FIRST_NAME) LIKE LOWER(CONCAT(CONCAT('%', ?1), '%'))",
            nativeQuery = true)
    Page<Employee> findByFirstNameWithNativeIndexedQueryParam(String firstName, Pageable paging);

    @Query(value =  "SELECT * FROM EMPLOYEES e WHERE LOWER(e.FIRST_NAME) LIKE LOWER(CONCAT(CONCAT('%', :pFirstName), '%'))"
            + " ORDER BY EMPLOYEE_ID ASC",
            countQuery = "SELECT count(*) FROM EMPLOYEES e WHERE LOWER(e.FIRST_NAME) LIKE LOWER(CONCAT(CONCAT('%', :pFirstName), '%'))"
                    + " ORDER BY EMPLOYEE_ID ASC",
            nativeQuery = true)
    Page<Employee> findByFirstNameWithNativeNamedParam(@Param("pFirstName") String firstName, Pageable paging);

    @Procedure(procedureName = "ADD_DEPT")
    public void addDepartment(@Param("v_dept_id") Integer deptId, @Param("v_dept_name") String deptName);
}
