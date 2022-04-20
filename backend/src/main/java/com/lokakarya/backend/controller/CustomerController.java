package com.lokakarya.backend.controller;

import com.lokakarya.backend.entity.Customer;
import com.lokakarya.backend.service.CustomerService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.CustomerWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    // Get Customer By Id
    @GetMapping("/GetById")
    public DataResponse<CustomerWrapper> getCustomerById(@RequestParam("id") Long customerId) {
        return new DataResponse<CustomerWrapper>(customerService.getByCustomerId(customerId));
    }

    // Get All Customer
    @GetMapping("/findAll")
    public DataResponseList<CustomerWrapper> findAll() {
        return new DataResponseList<CustomerWrapper>(customerService.findAll());
    }

    // Get All Customer With Pagination
    @GetMapping("/findAllWithPagination")
    public DataResponsePagination<CustomerWrapper, Customer> findAllWithPagination(@RequestParam("page") int page,
            @RequestParam("size") int size) {
        return new DataResponsePagination<CustomerWrapper, Customer>(
                customerService.findAllWithPagination(page, size));
    }

    // Get Customer Name With Pagination
    @GetMapping("/findByCustomerNamePaginition")
    public DataResponsePagination<CustomerWrapper, Customer> findCustomerNamePagination(
            @RequestParam("customerName") String customerName, @RequestParam("page") int page,
            @RequestParam("size") int size) {
        return new DataResponsePagination<CustomerWrapper, Customer>(
                customerService.findByCustomerNameContainingIgnoreCasePagination(customerName, page, size));
    }

    // Find Customer Name IgnoreCase And Containable
    @GetMapping("/findByCustomerName")
    public DataResponseList<CustomerWrapper> findCustomerName(@RequestParam("customerName") String customerName) {
        return new DataResponseList<CustomerWrapper>(
                customerService.findByCustomerNameContainingIgnoreCase(customerName));
    }

    // Find Customer Email IgnoreCase And Containable
    @GetMapping("/findByCustomerEmail")
    public DataResponseList<CustomerWrapper> findCustomerEmail(@RequestParam("email") String email) {
        return new DataResponseList<CustomerWrapper>(
                customerService.findByEmail(email));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long customerName) {
        customerService.delete(customerName);
    }

    @PostMapping("/posts")
    public DataResponse<CustomerWrapper> save(@RequestBody CustomerWrapper wrapper) {
        return new DataResponse<CustomerWrapper>(customerService.save(wrapper));
    }

    @PutMapping("/update")
    public DataResponse<CustomerWrapper> update(@RequestBody CustomerWrapper wrapper) {
        return new DataResponse<CustomerWrapper>(customerService.save(wrapper));

    }
}
