package com.lokakarya.backend.controller;

import com.lokakarya.backend.service.PermissionService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.wrapper.PermissionWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(path = "/permission")
public class PermissionController {
    @Autowired
    PermissionService permissionService;

    @GetMapping(path = "/findAll")
    DataResponseList<PermissionWrapper> findAll(){
        return new DataResponseList<PermissionWrapper>(permissionService.findAll());
    }
    @GetMapping(path = "/getById")
    DataResponse<PermissionWrapper> getById(@RequestParam("id") Long id){
        return new DataResponse<PermissionWrapper>(permissionService.getById(id));
    }

    @PostMapping(path= "/post")
    DataResponse<PermissionWrapper> post(@RequestBody PermissionWrapper wrapper){
        return new DataResponse<PermissionWrapper>(permissionService.save(wrapper));
    }
    @PutMapping(path = "/put")
    DataResponse<PermissionWrapper> update(@RequestBody PermissionWrapper wrapper){
        return new DataResponse<PermissionWrapper>(permissionService.save(wrapper));
    }
    
    @DeleteMapping(path = "/delete")
    DataResponse<PermissionWrapper> delete(@RequestParam("id") Long id){
        permissionService.delete(id);
        return new DataResponse<PermissionWrapper>(true, "Delete Sukses");
    }
}
