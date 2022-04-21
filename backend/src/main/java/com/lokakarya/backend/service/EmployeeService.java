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
import com.lokakarya.backend.validator.EmailValidator;
import com.lokakarya.backend.wrapper.EmployeeWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    private EmailValidator emailValidator;

    private Employee toEntity(EmployeeWrapper wrapper) {
        emailValidator = new EmailValidator();
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
        wrapper.setManagerName(
                entityEmployees.getManager() != null
                        ? entityEmployees.getManager().getFirstName() + ' ' + entityEmployees.getManager().getLastName()
                        : null);
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

    public List<EmployeeWrapper> findByFullNameContainingIgnoreCase(String fullName) {
        List<Employee> employeeList = employeeRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(fullName);
        List<EmployeeWrapper> employeeWrappers = toWrapperList(employeeList);
        return employeeWrappers;
    }

    public List<EmployeeWrapper> findByDepartmentNameContainingIgnoreCase(String departmentName) {
        List<Employee> employeeList = employeeRepository.findByDepartmentNameContainingIgnoreCase(departmentName);
        List<EmployeeWrapper> employeeWrappers = toWrapperList(employeeList);
        return employeeWrappers;
    }

    public List<EmployeeWrapper> findByEmailContainingIgnoreCase(String email) {
        List<Employee> employeeList = employeeRepository.findByEmailContainingIgnoreCase(email);
        List<EmployeeWrapper> employeeWrappers = toWrapperList(employeeList);
        return employeeWrappers;
    }

    public List<EmployeeWrapper> getByJobTitleContainingIgnoreCase(String jobTitle) {
        List<Employee> employeeList = employeeRepository.getByJobTitleContainingIgnoreCase(jobTitle);
        List<EmployeeWrapper> employeeWrappers = toWrapperList(employeeList);
        return employeeWrappers;
    }

    public List<EmployeeWrapper> findByManagerFullNameContainingIgnoreCase(String fullName) {
        List<Employee> managerList = employeeRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(fullName);
        List<Employee> employees = new ArrayList<Employee>();

        for (Employee manager : managerList) {
            employees.addAll(employeeRepository.getByManager(manager));
        }
        List<EmployeeWrapper> employeeWrappers = toWrapperList(employees);
        return employeeWrappers;
    }

    /* Create and Update */
    public EmployeeWrapper save(EmployeeWrapper wrapper) {
        Employee employee = new Employee();
        if (wrapper.getEmployeeId() == null) {
            if (wrapper.getLastName() == null) {
                throw new BusinessException("Last Name can't be null");
            }
            if (wrapper.getSalary() < 0) {
                throw new BusinessException("Salary can't be zero");
            }
            employee = employeeRepository.save(toEntity(wrapper));
        } else {
            Optional<Employee> employeeExist = employeeRepository.findById(wrapper.getEmployeeId());
            if (!employeeExist.isPresent()) {
                throw new BusinessException("Tidak ada employee dengan ID tersebut");
            }
            
            String jobLama = employeeExist.get().getJob().getJobId();
            Long deptLama = employeeExist.get().getDepartment().getDepartmentId(); 

            if (!jobLama.equals(wrapper.getJobId()) || deptLama != wrapper.getDepartmentId()) {
                JobHistory jobHistory = new JobHistory();
                jobHistory.setEmployeeId(employeeExist.get().getEmployeeId());
                jobHistory.setStartDate(employeeExist.get().getHireDate());
                jobHistory.setEndDate(wrapper.getHireDate());
                jobHistory.setJob(employeeExist.get().getJob());
                jobHistory.setDepartment(employeeExist.get().getDepartment());
                jobHistoryRepository.save(jobHistory);
            }
            employee = employeeRepository.save(toEntity(wrapper));
        }
        return toWrapper(employee);
    }

    /* Delete Data */
    public void delete(Long id) {
        if (id == null) {
            throw new BusinessException("Employee Id does not exist");
        }
        Optional<Employee> employee = employeeRepository.findById(id);
        if (!employee.isPresent()) {
            throw new BusinessException("Employee Id does not found");
        }
        employeeRepository.deleteById(id);
    }

}
