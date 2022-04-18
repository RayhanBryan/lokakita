package com.lokakarya.backend.controller;

import com.lokakarya.backend.entity.Customer;
import com.lokakarya.backend.entity.Department;
import com.lokakarya.backend.service.CustomerService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.CustomerWrapper;
import com.lokakarya.backend.wrapper.DepartmentWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value="/customer")
public class CustomerController {
@Autowired
    CustomerService customerService;

    @GetMapping("/GetById")
    public DataResponse<CustomerWrapper> getCustomerById(@RequestParam("id") Long customerId) {
        return new DataResponse<CustomerWrapper>(customerService.getByCustomerId(customerId));
    }

    // get list of employees using response
    @GetMapping("/findAll")
    public DataResponseList<CustomerWrapper> findAll() {
        return new DataResponseList<CustomerWrapper>(customerService.findAll());

    }

    @GetMapping("/findAllWithPagination")
    public DataResponsePagination<CustomerWrapper, Customer> findAllWithPagination(@RequestParam("page") int page,
                                                                                   @RequestParam("size") int size) {
        return new DataResponsePagination<CustomerWrapper, Customer>(
                customerService.findAllWithPagination(page, size));
    }

    @GetMapping("/findByCustomerName")
    public DataResponsePagination<CustomerWrapper, Customer> findCustomerName(
            @RequestParam("customerName") String customerName, @RequestParam("page") int page,
            @RequestParam("size") int size) {
        return new DataResponsePagination<CustomerWrapper, Customer>(
                customerService.findByCustomerNameContainingIgnoreCase(customerName, page, size));
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
