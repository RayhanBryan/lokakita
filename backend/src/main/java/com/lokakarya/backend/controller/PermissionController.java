package com.lokakarya.backend.controller;

import com.lokakarya.backend.service.PermissionService;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.wrapper.PermissionWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
    public DataResponseList<PermissionWrapper> findAll(){
        return new DataResponseList<PermissionWrapper>(permissionService.findAll());
    }
    @GetMapping(path = "/getPermissionByUserId")
    public DataResponseList<PermissionWrapper> getPermissionByUserId(@RequestParam("userId")Long userId){
        return new DataResponseList<PermissionWrapper>(permissionService.getPermissionByUserId(userId));
    }
}
