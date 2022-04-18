package com.lokakarya.backend.service;

import com.lokakarya.backend.entity.Department;
import com.lokakarya.backend.entity.Employee;
import com.lokakarya.backend.entity.Job;
import com.lokakarya.backend.entity.JobHistory;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.DepartmentRepository;
import com.lokakarya.backend.repository.EmployeeRepository;
import com.lokakarya.backend.repository.JobHistoryRepository;
import com.lokakarya.backend.repository.JobRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.DepartmentWrapper;
import com.lokakarya.backend.wrapper.EmployeeWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    JobRepository jobRepository;
    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    JobHistoryRepository jobHistoryRepository;

    private Employee toEntity(EmployeeWrapper wrapper) {
        Employee entity = new Employee();
        if (wrapper.getEmployeeId() != null) {
            entity = employeeRepository.getById(wrapper.getEmployeeId());
        }
        Optional<Department> optionalDept = departmentRepository.findById(wrapper.getDepartmentId());
        Department department = optionalDept.orElse(null);
        entity.setDepartment(department);
        entity.setEmail(wrapper.getEmail());
        entity.setFirstName(wrapper.getFirstName());
        entity.setHireDate(wrapper.getHireDate());
        Optional<Job> optionalJob = jobRepository.findById(wrapper.getJobId());
        Job job = optionalJob.orElse(null);
        entity.setJob(job);
        entity.setLastName(wrapper.getLastName());
        Optional<Employee> optionalEmp = employeeRepository.findById(wrapper.getManagerId());
        Employee manager = optionalEmp.orElse(null);
        entity.setManager(manager);
        entity.setPhoneNumber(wrapper.getPhoneNumber());
        entity.setSalary(wrapper.getSalary());
        entity.setCommissionPct(wrapper.getCommissionPct());
        return entity;
    }

    private EmployeeWrapper toWrapper(Employee entityEmployees) {
        EmployeeWrapper wrapper = new EmployeeWrapper();
        wrapper.setEmployeeId(entityEmployees.getEmployeeId());
        wrapper.setFirstName(entityEmployees.getFirstName());
        wrapper.setLastName(entityEmployees.getLastName());
        wrapper.setEmail(entityEmployees.getEmail());
        wrapper.setPhoneNumber(entityEmployees.getPhoneNumber());
        wrapper.setHireDate(entityEmployees.getHireDate());
        wrapper.setJobId(entityEmployees.getJob() != null ? entityEmployees.getJob().getJobId() : null);
        wrapper.setJobTitle(entityEmployees.getJob() != null ? entityEmployees.getJob().getJobTitle() : null);
        wrapper.setSalary(entityEmployees.getSalary());
        wrapper.setCommissionPct(entityEmployees.getCommissionPct());
        wrapper.setDepartmentId(
                entityEmployees.getDepartment() != null ? entityEmployees.getDepartment().getDepartmentId() : null);
        wrapper.setDepartmentName(
                entityEmployees.getDepartment() != null ? entityEmployees.getDepartment().getDepartmentName() : null);
        wrapper.setManagerId(
                entityEmployees.getManager() != null ? entityEmployees.getManager().getEmployeeId() : null);
        wrapper.setManagerFirstName(
                entityEmployees.getManager() != null ? entityEmployees.getManager().getFirstName() : null);
        wrapper.setManagerLastName(
                entityEmployees.getManager() != null ? entityEmployees.getManager().getLastName() : null);
        return wrapper;
    }

    private List<EmployeeWrapper> toWrapperList(List<Employee> entityList) {
        List<EmployeeWrapper> wrapperList = new ArrayList<EmployeeWrapper>();
        for (Employee entity : entityList) {
            EmployeeWrapper wrapper = toWrapper(entity);
            wrapperList.add(wrapper);
        }
        return wrapperList;
    }

    /* Retrieve single item */
    public EmployeeWrapper getByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).get();
        return toWrapper(employee);
    }

    /* Retrieve All Data */
    public List<EmployeeWrapper> findAll() {
        List<Employee> employeeList = employeeRepository.findAll();
        return toWrapperList(employeeList);
    }

    /* Find All With Pagination */
    public PaginationList<EmployeeWrapper, Employee> findAllWithPagination(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeRepository.findAll(paging);
        List<Employee> employeeList = employeePage.getContent();
        List<EmployeeWrapper> employeeWrapperList = toWrapperList(employeeList);
        return new PaginationList<EmployeeWrapper, Employee>(employeeWrapperList, employeePage);
    }

    public PaginationList<EmployeeWrapper, Employee> findByFirstNamePaginationContainingIgnoreCase(
            String firstName, int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeRepository.findByFirstNameContainingIgnoreCase(firstName,
                paging);
        List<Employee> employeeList = employeePage.getContent();
        List<EmployeeWrapper> employeeWrapperList = toWrapperList(employeeList);
        return new PaginationList<EmployeeWrapper, Employee>(employeeWrapperList, employeePage);
    }
    public  List<EmployeeWrapper> findByFirstNameContainingIgnoreCase(String firstName){
        List<Employee> employeeList = employeeRepository.findByFirstNameContainingIgnoreCase(firstName);
        List <EmployeeWrapper> employeeWrappers = toWrapperList(employeeList);
        return employeeWrappers;
    }
    /* Create and Update */
    public EmployeeWrapper save(EmployeeWrapper wrapper) {
        Employee employee = employeeRepository.save(toEntity(wrapper));
        return toWrapper(employee);
    }
    /* Delete Data */
    public void delete(Long id) {
        departmentRepository.deleteById(id);
    }

}
