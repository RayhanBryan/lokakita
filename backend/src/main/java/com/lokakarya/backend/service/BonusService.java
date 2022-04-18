package com.lokakarya.backend.service;

import com.lokakarya.backend.entity.Employee;
import com.lokakarya.backend.entity.Job;
import com.lokakarya.backend.exception.BusinessException;
import com.lokakarya.backend.repository.BonusRepository;
import com.lokakarya.backend.repository.JobRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.BonusWrapper;
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
public class BonusService {
    @Autowired
    BonusRepository bonusRepository;
    @Autowired
    JobRepository jobRepository;

    private Employee toEntity(BonusWrapper wrapper) {
        Employee entity = new Employee();
        if (wrapper.getEmployeeId() != null) {
            entity = bonusRepository.getById(wrapper.getEmployeeId());
        }
        entity.setFirstName(wrapper.getFirstName());
        entity.setLastName(wrapper.getLastName());
        entity.setSalary(wrapper.getSalary());
        entity.setCommissionPct(wrapper.getCommissionPct());
        Optional<Job> optionalJob = jobRepository.findById(wrapper.getJobId());
        Job job = optionalJob.isPresent() ? optionalJob.get() : null;
        entity.setJob(job);
        return entity;
    }

    private BonusWrapper toWrapper(Employee entityEmployees) {
        BonusWrapper wrapper = new BonusWrapper();
        wrapper.setEmployeeId(entityEmployees.getEmployeeId());
        wrapper.setFirstName(entityEmployees.getFirstName());
        wrapper.setLastName(entityEmployees.getLastName());
        wrapper.setSalary(entityEmployees.getSalary());
        wrapper.setCommissionPct(entityEmployees.getCommissionPct());
        wrapper.setJobId(entityEmployees.getJob() != null ? entityEmployees.getJob().getJobId() : null);
        wrapper.setJobTitle(entityEmployees.getJob() != null ? entityEmployees.getJob().getJobTitle() : null);
        return wrapper;
    }

    private List<BonusWrapper> toWrapperList(List<Employee> entityList) {
        List<BonusWrapper> wrapperList = new ArrayList<BonusWrapper>();
        for (Employee entity : entityList) {
            BonusWrapper wrapper = toWrapper(entity);
            wrapperList.add(wrapper);
        }
        return wrapperList;
    }

    /* Retrieve single item */
    public BonusWrapper getByEmployeeId(Long employeeId) {
        Employee employee = bonusRepository.findById(employeeId).get();
        return toWrapper(employee);
    }

    /* Retrieve All Data */
    public List<BonusWrapper> findAll() {
        List<Employee> employeeList = bonusRepository.findAll();
        return toWrapperList(employeeList);
    }

    /* Find All With Pagination */
    public PaginationList<BonusWrapper, Employee> findAllWithPagination(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Employee> employeePage = bonusRepository.findAll(paging);
        List<Employee> employeeList = employeePage.getContent();
        List<BonusWrapper> bonusWrapperList = toWrapperList(employeeList);
        return new PaginationList<BonusWrapper, Employee>(bonusWrapperList, employeePage);
    }

    public PaginationList<BonusWrapper, Employee> findByFirstNameContainingIgnoreCase(
            String firstName, int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Employee> employeePage = bonusRepository.findByFirstNameContainingIgnoreCase(firstName,
                paging);
        List<Employee> employeeList = employeePage.getContent();
        List<BonusWrapper> bonusWrapperList = toWrapperList(employeeList);
        return new PaginationList<BonusWrapper, Employee>(bonusWrapperList, employeePage);
    }

    /* Create and Update */
    public BonusWrapper save(BonusWrapper wrapper) {
        Employee employee = new Employee();
        if (wrapper.getEmployeeId() == null) {
        if (wrapper.getLastName() == null){
        throw new BusinessException("Last name can't be empty");
        } else if (wrapper.getJobId() == null ){
            throw  new BusinessException("Job id can't be empty");
        } else if (wrapper.getSalary() == 0) {
            throw new BusinessException("Salary must be bigger than zero");
        }
            employee = bonusRepository.save(toEntity(wrapper));
        } else {
            Optional<Employee> employeeExist = bonusRepository.findById(wrapper.getEmployeeId());
            if (!employeeExist.isPresent()) {
                throw new BusinessException("Tidak ada employee dengan ID tersebut");
            }
            employee = bonusRepository.save(toEntity(wrapper));
        }
        return toWrapper(employee);
    }

    /* Delete Data */
    public void delete(Long id) {
        bonusRepository.deleteById(id);
    }
}
