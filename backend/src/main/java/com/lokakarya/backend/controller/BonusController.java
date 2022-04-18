package com.lokakarya.backend.controller;

import com.lokakarya.backend.entity.Employee;
import com.lokakarya.backend.service.BonusService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.BonusWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value="/bonus")
public class BonusController {
@Autowired
    BonusService bonusService;

    @GetMapping("/GetById")
    public DataResponse<BonusWrapper> getEmployeeId(@RequestParam("id") Long employeeId) {
        return new DataResponse<BonusWrapper>(bonusService.getByEmployeeId(employeeId));
    }

    // get list of bonus using response
    @GetMapping("/findAll")
    public DataResponseList<BonusWrapper> findAll() {
        return new DataResponseList<BonusWrapper>(bonusService.findAll());

    }

    @GetMapping("/findAllWithPagination")
    public DataResponsePagination<BonusWrapper, Employee> findAllWithPagination(@RequestParam("page") int page,
                                                                                   @RequestParam("size") int size) {
        return new DataResponsePagination<BonusWrapper, Employee>(
                bonusService.findAllWithPagination(page, size));
    }

    @GetMapping("/findByFirstName")
    public DataResponsePagination<BonusWrapper, Employee> findByFIrstName(
            @RequestParam("firstName") String firstName, @RequestParam("page") int page,
            @RequestParam("size") int size) {
        return new DataResponsePagination<BonusWrapper, Employee>(
                bonusService.findByFirstNameContainingIgnoreCase(firstName, page, size));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long employeeId) {
        bonusService.delete(employeeId);
    }

    @PostMapping("/post")
    public DataResponse<BonusWrapper> save(@RequestBody BonusWrapper wrapper) {
        return new DataResponse<BonusWrapper> (bonusService.save(wrapper));
    }

    @PutMapping("/update")
    public DataResponse<BonusWrapper> update(@RequestBody BonusWrapper wrapper) {
        return new DataResponse<BonusWrapper> (bonusService.save(wrapper));
    }
}
