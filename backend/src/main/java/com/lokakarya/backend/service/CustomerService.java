package com.lokakarya.backend.service;

import com.lokakarya.backend.entity.Customer;
import com.lokakarya.backend.entity.Department;
import com.lokakarya.backend.entity.Employee;
import com.lokakarya.backend.entity.Location;
import com.lokakarya.backend.repository.CustomerRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.CustomerWrapper;
import com.lokakarya.backend.wrapper.DepartmentWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    private Customer toEntity(CustomerWrapper wrapper) {
        Customer entity = new Customer();
        if (wrapper.getCustomerId() != null) {
            entity = customerRepository.getById(wrapper.getCustomerId());
        }
        entity.setEmail(wrapper.getEmail());
        entity.setCustomerName(wrapper.getCustomerName());
        entity.setPhoneNumber(wrapper.getPhoneNumber());
        return entity;
    }
    private CustomerWrapper toWrapper(Customer entity) {
        CustomerWrapper wrapper = new CustomerWrapper();
        wrapper.setCustomerId(entity.getCustomerId());
        wrapper.setEmail(entity.getEmail());
        wrapper.setCustomerName(entity.getCustomerName());
        wrapper.setPhoneNumber(entity.getPhoneNumber());
        return wrapper;
    }
    private List<CustomerWrapper> toWrapperList(List<Customer> entityList) {
        List<CustomerWrapper> wrapperList = new ArrayList<CustomerWrapper>();
        for (Customer entity : entityList) {
            CustomerWrapper wrapper = toWrapper(entity);
            wrapperList.add(wrapper);
        }
        return wrapperList;
    }

    /* Retrieve single item */
    public CustomerWrapper getByCustomerId(Long customerId) {
        Customer customer = customerRepository.findById(customerId).get();
        return toWrapper(customer);
    }

    /* Retrieve All Data */
    public List<CustomerWrapper> findAll() {
        List<Customer> customerList = customerRepository.findAll();
        return toWrapperList(customerList);
    }

    /* Find All With Pagination */
    public PaginationList<CustomerWrapper, Customer> findAllWithPagination(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Customer> customerPage = customerRepository.findAll(paging);
        List<Customer> customerList = customerPage.getContent();
        List<CustomerWrapper> customerWrapperList = toWrapperList(customerList);
        return new PaginationList<CustomerWrapper, Customer>(customerWrapperList, customerPage);
    }

    public PaginationList<CustomerWrapper, Customer> findByCustomerNameContainingIgnoreCase(
            String customerName, int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Customer> customerPage = customerRepository.findByCustomerNameContainingIgnoreCase(customerName,
                paging);
        List<Customer> customerList = customerPage.getContent();
        List<CustomerWrapper> customerWrapperList = toWrapperList(customerList);
        return new PaginationList<CustomerWrapper, Customer>(customerWrapperList, customerPage);
    }

    /* Create and Update */

    public CustomerWrapper save(CustomerWrapper wrapper) {
        Customer customer = customerRepository.save(toEntity(wrapper));
        return toWrapper(customer);
    }

    /* Delete Data */
    public void delete(Long id) {
        customerRepository.deleteById(id);
    }
}
