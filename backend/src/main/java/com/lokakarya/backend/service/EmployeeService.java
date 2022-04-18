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
import com.lokakarya.backend.wrapper.EmployeeWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
        Department department = optionalDept.isPresent() ? optionalDept.get() : null;
        entity.setDepartment(department);
        entity.setEmail(wrapper.getEmail());
        entity.setFirstName(wrapper.getFirstName());
        entity.setHireDate(wrapper.getHireDate());
        Optional<Job> optionalJob = jobRepository.findById(wrapper.getJobId());
        Job job = optionalJob.isPresent() ? optionalJob.get() : null;
        entity.setJob(job);
        entity.setLastName(wrapper.getLastName());
        Optional<Employee> optionalEmp = employeeRepository.findById(wrapper.getManagerId());
        Employee manager = optionalEmp.isPresent() ? optionalEmp.get() : null;
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

    /* Create and Update */

    public EmployeeWrapper save(EmployeeWrapper wrapper) {
        Employee employee=new Employee();
        if(wrapper.getEmployeeId()==null) {
            employee = employeeRepository.save(toEntity(wrapper));
        }
        else {
            Optional<Employee> employeeLama=employeeRepository.findById(wrapper.getEmployeeId());
            if(!employeeLama.isPresent()) {
                throw new BusinessException("Tidak ada employee dengan ID tersebut");
            }

            if(employeeLama.get().getJob().getJobId()!=wrapper.getJobId()||employeeLama.get().getDepartment().getDepartmentId()!=wrapper.getDepartmentId()) {
                JobHistory jobHistory=new JobHistory();
                jobHistory.setEmployeeId(employeeLama.get().getEmployeeId());
                jobHistory.setStartDate(employeeLama.get().getHireDate());
                jobHistory.setEndDate(wrapper.getHireDate());
                jobHistory.setJob(employeeLama.get().getJob());
                jobHistory.setDepartment(employeeLama.get().getDepartment());
                jobHistoryRepository.save(jobHistory);
            }
            employee=employeeRepository.save(toEntity(wrapper));
        }
        return toWrapper(employee);




    }

    /* Find All With Pagination */
    public PaginationList<EmployeeWrapper, Employee> findAllWithPagination(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeRepository.findAll(paging);
        List<Employee> employeeList = employeePage.getContent();
        List<EmployeeWrapper> employeeWrapperList = toWrapperList(employeeList);
        return new PaginationList<EmployeeWrapper, Employee>(employeeWrapperList, employeePage);
    }

    public PaginationList<EmployeeWrapper, Employee> findByFirstNameContaining(String firstName, int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeRepository.findByFirstNameContainingIgnoreCase(firstName, paging);
        List<Employee> employeeList = employeePage.getContent();
        List<EmployeeWrapper> employeeWrapperList = toWrapperList(employeeList);
        return new PaginationList<EmployeeWrapper, Employee>(employeeWrapperList, employeePage);
    }

    public PaginationList<EmployeeWrapper, Employee> findByFirstNameWithCustomOrderBy(String firstName, int page,
                                                                                       int size, String orderBy, String column) {
        Pageable paging;
        if (orderBy.equalsIgnoreCase("DESC") || orderBy.equalsIgnoreCase("descending")) {
            paging = PageRequest.of(page, size, Sort.by(column).descending());
        } else if (orderBy.equalsIgnoreCase("ASC") || orderBy.equalsIgnoreCase("ascending")) {
            paging = PageRequest.of(page, size, Sort.by(column).ascending());
        } else {
            paging = PageRequest.of(page, size, Sort.by(column));
        }
        Page<Employee> pageEmployeeList = employeeRepository.findByFirstNameWithJpqlNamedParam(firstName, paging);
        List<Employee> employeeList = pageEmployeeList.getContent();

        List<EmployeeWrapper> employeeWrapperList = toWrapperList(employeeList);
        return new PaginationList<EmployeeWrapper, Employee>(employeeWrapperList, pageEmployeeList);
    }

    /* Delete Data */
    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> findByFirstName(String firstName) {
        return employeeRepository.findByFirstName(firstName);
    }
//
//    public List<Employee> findByFirstNameContaining(String firstName) {
//        return employeeRepository.findByFirstNameContaining(firstName);
//    }

    public List<Employee> findByFirstNameOrLastName(String firstName, String lastName) {
        return employeeRepository.findByFirstNameOrLastName(firstName, lastName);
    }

    public List<Employee> findByFirstNameContainingOrLastNameContainingAllIgnoreCase(String firstName,
                                                                                      String lastName) {
        return employeeRepository.findByFirstNameContainingOrLastNameContainingAllIgnoreCase(firstName, lastName);
    }

//	public List<Employees> findAllWithPagination(int page, int size) {
//		Pageable paging = PageRequest.of(page, size, Sort.by("employeeId").ascending());
//		Page<Employees> employeePage = employeeRepository.findAll(paging);
//		return employeePage.toList();
////		return emplyeeList;
//	}

    public Page<Employee> findByFirstNameContainingWithPagination(String firstName, int page, int size) {
        Pageable paging = PageRequest.of(page, size,
                Sort.by("firstName").ascending().and(Sort.by("employeeId").descending()));
        return employeeRepository.findByFirstNameContaining(firstName, paging);
    }

    public List<Employee> findByFirstNameWithJpqlIndexedQueryParam(String firstName) {
        return employeeRepository.findByFirstNameWithJpqlIndexedQueryParam(firstName);
    }

    public Page<Employee> findByFirstNameWithJpqlIndexedQueryParamPagination(String firstName, int page, int size) {
        Pageable paging = PageRequest.of(page, size,
                Sort.by("firstName").ascending().and(Sort.by("employeeId").descending()));
        return employeeRepository.findByFirstNameWithJpqlIndexedQueryParam(firstName, paging);
    }

    public Page<Employee> findByFirstNameWithJpqlNamedParamPagination(String firstName, int page, int size) {
//		Pageable paging = PageRequest.of(page, size, Sort.by("firstName").ascending().and(Sort.by("employeenId").descending()));
        Pageable paging = PageRequest.of(page, size, Sort.by("employeeId").ascending());
        return employeeRepository.findByFirstNameWithJpqlNamedParam(firstName, paging);
    }

    public List<Employee> findByFirstNameWithNativeIndexedQueryParam(String firstName) {
        return employeeRepository.findByFirstNameWithNativeIndexedQueryParam(firstName);
    }

    public Page<Employee> findByFirstNameWithNativeIndexedQueryParamPagination(String firstName, int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        return employeeRepository.findByFirstNameWithNativeIndexedQueryParam(firstName, paging);
    }

    public Page<Employee> findByFirstNameWithNativeNamedParamPagination(String firstName, int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        return employeeRepository.findByFirstNameWithNativeNamedParam(firstName, paging);
    }




}
