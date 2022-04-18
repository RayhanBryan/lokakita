package com.lokakarya.backend.service;

import com.lokakarya.backend.entity.Department;
import com.lokakarya.backend.entity.Employee;
import com.lokakarya.backend.entity.Location;
import com.lokakarya.backend.repository.DepartmentRepository;
import com.lokakarya.backend.repository.EmployeeRepository;
import com.lokakarya.backend.repository.LocationRepository;
import com.lokakarya.backend.util.PaginationList;
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
public class DepartmentService {
    @Autowired
    DepartmentRepository departmentRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    EmployeeRepository employeeRepository;

    private Department toEntity(DepartmentWrapper wrapper) {
        Department entity = new Department();
        if (wrapper.getDepartmentId() != null) {
            entity = departmentRepository.getById(wrapper.getDepartmentId());
        }
        entity.setDepartmentName(wrapper.getDepartmentName());
        Optional<Location> optionalLocation = locationRepository.findById(wrapper.getLocationId());
        Location location = optionalLocation.isPresent() ? optionalLocation.get() : null;
        entity.setLocation(location);
        Optional<Employee> optionalEmployee = employeeRepository.findById(wrapper.getManagerId());
        Employee employee = optionalEmployee.isPresent() ? optionalEmployee.get() :null;
        entity.setManager(employee);
        return entity;
    }

    private DepartmentWrapper toWrapper(Department entity) {
        DepartmentWrapper wrapper = new DepartmentWrapper();
        wrapper.setDepartmentId(entity.getDepartmentId());
        wrapper.setDepartmentName(entity.getDepartmentName());
        wrapper.setLocationId(entity.getLocation() != null ? entity.getLocation().getLocationId() : null);
        wrapper.setManagerId(entity.getManager()!= null ? entity.getManager().getEmployeeId() : null);
        wrapper.setManagerFirstName(entity.getManager()!= null ? entity.getManager().getFirstName() : null);
        wrapper.setManagerLastName(entity.getManager()!= null ? entity.getManager().getLastName() : null);
        wrapper.setStreetAddress(entity.getLocation()!= null ? entity.getLocation().getStreetAddress() : null);
        wrapper.setCity(entity.getLocation()!= null ? entity.getLocation().getCity() : null);
        return wrapper;
    }

    private List<DepartmentWrapper> toWrapperList(List<Department> entityList) {
        List<DepartmentWrapper> wrapperList = new ArrayList<DepartmentWrapper>();
        for (Department entity : entityList) {
            DepartmentWrapper wrapper = toWrapper(entity);
            wrapperList.add(wrapper);
        }
        return wrapperList;
    }

    /* Retrieve single item */
    public DepartmentWrapper getByDepartmentId(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).get();
        return toWrapper(department);
    }

    /* Retrieve All Data */
    public List<DepartmentWrapper> findAll() {
        List<Department> departmentList = departmentRepository.findAll();
        return toWrapperList(departmentList);
    }

    /* Find All With Pagination */
    public PaginationList<DepartmentWrapper, Department> findAllWithPagination(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Department> departmentPage = departmentRepository.findAll(paging);
        List<Department> departmentList = departmentPage.getContent();
        List<DepartmentWrapper> countryWrapperList = toWrapperList(departmentList);
        return new PaginationList<DepartmentWrapper, Department>(countryWrapperList, departmentPage);
    }

//    public PaginationList<DepartmentWrapper, Department> findByDepartmentNamePaginationContainingIgnoreCase(
//            String departmentName, int page, int size) {
//        Pageable paging = PageRequest.of(page, size);
//        Page<Department> departmentPage = departmentRepository.findByDepartmentNamePaginationContainingIgnoreCase(departmentName,
//                paging);
//        List<Department> departmentList = departmentPage.getContent();
//        List<DepartmentWrapper> departmentWrapperList = toWrapperList(departmentList);
//        return new PaginationList<DepartmentWrapper, Department>(departmentWrapperList, departmentPage);
//    }
    public  List<DepartmentWrapper> findByDepartmentNameContainingIgnoreCase(String departmentName){
       List<Department> departmentList = departmentRepository.findByDepartmentNameContainingIgnoreCase(departmentName);
        List <DepartmentWrapper> departmentWrappers = toWrapperList(departmentList);
       return departmentWrappers;
    }
    /* Create and Update */

    public DepartmentWrapper save(DepartmentWrapper wrapper) {
        Department departments = departmentRepository.save(toEntity(wrapper));
        return toWrapper(departments);
    }

    /* Delete Data */
    public void delete(Long id) {
        departmentRepository.deleteById(id);
    }
}
