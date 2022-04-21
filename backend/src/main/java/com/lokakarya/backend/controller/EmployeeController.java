package com.lokakarya.backend.controller;

import com.lokakarya.backend.entity.Employee;
import com.lokakarya.backend.service.EmployeeService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.EmployeeWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/employees")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/GetById")
    public DataResponse<EmployeeWrapper> getEmployeeId(@RequestParam("id") Long employeeId) {
        return new DataResponse<EmployeeWrapper>(employeeService.getByEmployeeId(employeeId));
    }

    // get list of employees using response
    @GetMapping("/findAll")
    public DataResponseList<EmployeeWrapper> findAll() {
        return new DataResponseList<EmployeeWrapper>(employeeService.findAll());

    }

    @GetMapping("/findAllWithPagination")
    public DataResponsePagination<EmployeeWrapper, Employee> findAllWithPagination(@RequestParam("page") int page,
            @RequestParam("size") int size) {
        return new DataResponsePagination<EmployeeWrapper, Employee>(
                employeeService.findAllWithPagination(page, size));
    }

    @GetMapping("/findByFullName")
    public DataResponseList<EmployeeWrapper> findByFullNameContainingIgnoreCase(
            @RequestParam("fullName") String fullName) {
        return new DataResponseList<EmployeeWrapper>(
                employeeService.findByFullNameContainingIgnoreCase(fullName));
    }

    @GetMapping("/findByDepartmentName")
    public DataResponseList<EmployeeWrapper> findByDepartmentNameContainingIgnoreCase(
            @RequestParam("departmentName") String departmentName) {
        return new DataResponseList<EmployeeWrapper>(
                employeeService.findByDepartmentNameContainingIgnoreCase(departmentName));
    }

    @GetMapping("/findByEmail")
    public DataResponseList<EmployeeWrapper> findByEmailContainingIgnoreCase(
            @RequestParam("email") String email) {
        return new DataResponseList<EmployeeWrapper>(
                employeeService.findByEmailContainingIgnoreCase(email));
    }

    @GetMapping("/findByJobTitle")
    public DataResponseList<EmployeeWrapper> getByJobTitleContainingIgnoreCase(
            @RequestParam("jobTitle") String jobTitle) {
        return new DataResponseList<EmployeeWrapper>(
                employeeService.getByJobTitleContainingIgnoreCase(jobTitle));
    }

    @GetMapping("/findByManagerName")
    public DataResponseList<EmployeeWrapper> findByManagerFullNameContainingIgnoreCase(
            @RequestParam("managerFirstName") String managerFullName) {
        return new DataResponseList<EmployeeWrapper>(
                employeeService.findByManagerFullNameContainingIgnoreCase(managerFullName));
    }

    @GetMapping("/findByFirstNameContaining")
    public DataResponsePagination<EmployeeWrapper, Employee> findByFIrstName(
            @RequestParam("firstName") String firstName, @RequestParam("page") int page,
            @RequestParam("size") int size) {
        return new DataResponsePagination<EmployeeWrapper, Employee>(
                employeeService.findByFirstNamePaginationContainingIgnoreCase(firstName, page, size));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long employeeId) {
        employeeService.delete(employeeId);
    }

    @PostMapping("/post")
    public DataResponse<EmployeeWrapper> save(@RequestBody EmployeeWrapper wrapper) {
        return new DataResponse<EmployeeWrapper>(employeeService.save(wrapper));
    }

    @PutMapping("/update")
    public DataResponse<EmployeeWrapper> update(@RequestBody EmployeeWrapper wrapper) {
        return new DataResponse<EmployeeWrapper>(employeeService.save(wrapper));
    }
}
