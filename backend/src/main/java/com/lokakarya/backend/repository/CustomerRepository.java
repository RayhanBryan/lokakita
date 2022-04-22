package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findAll(Pageable page);

    Page<Customer> findByCustomerNameContainingIgnoreCase(String customerName, Pageable paging);

    List<Customer> findByCustomerNameContainingIgnoreCase(String customerName);

    List<Customer> findByCustomerNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCase(
            String customerName, String email, String phoneNumber);

    default List<Customer> findByAllCategories(String all) {
        return findByCustomerNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCase(all,
                all, all);
    }

    List<Customer> findByEmailContainingIgnoreCase(String email);
}
