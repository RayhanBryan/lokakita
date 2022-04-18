//package com.lokakarya.backend.service;
//
//import com.lokakarya.backend.entity.Department;
//import com.lokakarya.backend.entity.Employee;
//import com.lokakarya.backend.entity.Job;
//import com.lokakarya.backend.entity.Location;
//import com.lokakarya.backend.repository.EmployeeRepository;
//import com.lokakarya.backend.repository.JobRepository;
//import com.lokakarya.backend.util.PaginationList;
//import com.lokakarya.backend.wrapper.BonusWrapper;
//import com.lokakarya.backend.wrapper.DepartmentWrapper;
//import com.lokakarya.backend.wrapper.EmployeeWrapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@Transactional
//public class BonusService {
//    @Autowired
//    EmployeeRepository bonusRepository;
//    @Autowired
//    JobRepository jobRepository;
//
//    private Employee toEntity(EmployeeWrapper wrapper) {
//        Employee entity = new Employee();
//        if (wrapper.getEmployeeId() != null) {
//            entity = bonusRepository.getById(wrapper.getEmployeeId());
//        }
//        entity.setEmail(wrapper.getEmail());
//        entity.setFirstName(wrapper.getFirstName());
//        Optional<Job> optionalJob = jobRepository.findById(wrapper.getJobId());
//        Job job = optionalJob.isPresent() ? optionalJob.get() : null;
//        entity.setJob(job);
//        entity.setLastName(wrapper.getLastName());
//        entity.setSalary(wrapper.getSalary());
//        entity.setCommissionPct(wrapper.getCommissionPct());
//        return entity;
//    }
//
//    private EmployeeWrapper toWrapper(Employee entityEmployees) {
//        EmployeeWrapper wrapper = new EmployeeWrapper();
//        wrapper.setEmployeeId(entityEmployees.getEmployeeId());
//        wrapper.setFirstName(entityEmployees.getFirstName());
//        wrapper.setLastName(entityEmployees.getLastName());
//        wrapper.setJobId(entityEmployees.getJob() != null ? entityEmployees.getJob().getJobId() : null);
//        wrapper.setJobTitle(entityEmployees.getJob() != null ? entityEmployees.getJob().getJobTitle() : null);
//        wrapper.setSalary(entityEmployees.getSalary());
//        wrapper.setCommissionPct(entityEmployees.getCommissionPct());
//        return wrapper;
//    }
//
//    private List<EmployeeWrapper> toWrapperList(List<Employee> entityList) {
//        List<EmployeeWrapper> wrapperList = new ArrayList<EmployeeWrapper>();
//        for (Employee entity : entityList) {
//            EmployeeWrapper wrapper = toWrapper(entity);
//            wrapperList.add(wrapper);
//        }
//        return wrapperList;
//    }
//
//    /* Retrieve single item */
//    public BonusWrapper getByDepartmentId(Long departmentId) {
//        Department department = departmentRepository.findById(departmentId).get();
//        return toWrapper(department);
//    }
//
//    /* Retrieve All Data */
//    public List<DepartmentWrapper> findAll() {
//        List<Department> departmentList = departmentRepository.findAll();
//        return toWrapperList(departmentList);
//    }
//
//    /* Find All With Pagination */
//    public PaginationList<DepartmentWrapper, Department> findAllWithPagination(int page, int size) {
//        Pageable paging = PageRequest.of(page, size);
//        Page<Department> departmentPage = departmentRepository.findAll(paging);
//        List<Department> departmentList = departmentPage.getContent();
//        List<DepartmentWrapper> countryWrapperList = toWrapperList(departmentList);
//        return new PaginationList<DepartmentWrapper, Department>(countryWrapperList, departmentPage);
//    }
//
//    public PaginationList<DepartmentWrapper, Department> findByDepartmentNameContainingIgnoreCase(
//            String departmentName, int page, int size) {
//        Pageable paging = PageRequest.of(page, size);
//        Page<Department> departmentPage = departmentRepository.findByDepartmentNameContainingIgnoreCase(departmentName,
//                paging);
//        List<Department> departmentList = departmentPage.getContent();
//        List<DepartmentWrapper> departmentWrapperList = toWrapperList(departmentList);
//        return new PaginationList<DepartmentWrapper, Department>(departmentWrapperList, departmentPage);
//    }
//
//    /* Create and Update */
//
//    public DepartmentWrapper save(DepartmentWrapper wrapper) {
//        Department departments = departmentRepository.save(toEntity(wrapper));
//        return toWrapper(departments);
//    }
//
//    /* Delete Data */
//    public void delete(Long id) {
//        departmentRepository.deleteById(id);
//    }
//}
