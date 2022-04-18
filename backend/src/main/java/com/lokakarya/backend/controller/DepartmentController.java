package com.lokakarya.backend.controller;

import com.lokakarya.backend.entity.Department;
import com.lokakarya.backend.service.DepartmentService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.DepartmentWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/departments")
public class DepartmentController {
    @Autowired
    DepartmentService departmentService;
    @GetMapping("/GetById")
    public DataResponse<DepartmentWrapper> getDepartmentById(@RequestParam("id") Long departmentId) {
        return new DataResponse<DepartmentWrapper>(departmentService.getByDepartmentId(departmentId));
    }

    // get list of employees using response
    @GetMapping("/findAll")
    public DataResponseList<DepartmentWrapper> findAll() {
        return new DataResponseList<DepartmentWrapper>(departmentService.findAll());

    }

    @GetMapping("/findAllWithPagination")
    public DataResponsePagination<DepartmentWrapper, Department> findAllWithPagination(@RequestParam("page") int page,
                                                                                       @RequestParam("size") int size) {
        return new DataResponsePagination<DepartmentWrapper, Department>(
                departmentService.findAllWithPagination(page, size));
    }

//    @GetMapping("/findByDepartmentNamePagination")
//    public DataResponsePagination<DepartmentWrapper, Department> findDepartmentName(
//            @RequestParam("departmentName") String departmentName, @RequestParam("page") int page,
//            @RequestParam("size") int size) {
//        return new DataResponsePagination<DepartmentWrapper, Department>(
//                departmentService.findByDepartmentNamePaginationContainingIgnoreCase(departmentName, page, size));
//    }

    @GetMapping("/findByDepartmentName")
    public DataResponseList<DepartmentWrapper> findDepartmentName(@RequestParam("departmentName") String departmentName) {
        return new DataResponseList<DepartmentWrapper>(departmentService.findByDepartmentNameContainingIgnoreCase(departmentName));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long departmentName) {
        departmentService.delete(departmentName);
    }

    @PostMapping("/posts")
    public DataResponse<DepartmentWrapper> save(@RequestBody DepartmentWrapper wrapper) {
        return new DataResponse<DepartmentWrapper>(departmentService.save(wrapper));
    }

    @PutMapping("/update")
    public DataResponse<DepartmentWrapper> update(@RequestBody DepartmentWrapper wrapper) {
        return new DataResponse<DepartmentWrapper>(departmentService.save(wrapper));

    }
}

