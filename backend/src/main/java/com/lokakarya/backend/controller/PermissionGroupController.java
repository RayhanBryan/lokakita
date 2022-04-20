package com.lokakarya.backend.controller;

import com.lokakarya.backend.service.PermissionGroupService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.wrapper.PermissionGroupWrapper;

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
@RequestMapping(path = "/permissionGroup")
public class PermissionGroupController {
    @Autowired
    PermissionGroupService permissionGroupService;

    @GetMapping(path = "/findAll")
    DataResponseList<PermissionGroupWrapper> findAll(){
        return new DataResponseList<PermissionGroupWrapper>(permissionGroupService.findAll());
    }
    @GetMapping(path = "/getById")
    DataResponse<PermissionGroupWrapper> getById(@RequestParam("id") Long id){
        return new DataResponse<PermissionGroupWrapper>(permissionGroupService.getById(id));
    }

    @PostMapping(path= "/post")
    DataResponse<PermissionGroupWrapper> post(@RequestBody PermissionGroupWrapper wrapper){
        return new DataResponse<PermissionGroupWrapper>(permissionGroupService.save(wrapper));
    }
    @PutMapping(path = "/put")
    DataResponse<PermissionGroupWrapper> update(@RequestBody PermissionGroupWrapper wrapper){
        return new DataResponse<PermissionGroupWrapper>(permissionGroupService.save(wrapper));
    }
    
    @DeleteMapping(path = "/delete")
    DataResponse<PermissionGroupWrapper> delete(@RequestParam("pUserId") Long id){
        permissionGroupService.delete(id);
        return new DataResponse<PermissionGroupWrapper>(true, "Delete Sukses");
    }
    
}
