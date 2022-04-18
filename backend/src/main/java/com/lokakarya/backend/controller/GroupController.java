package com.lokakarya.backend.controller;

import com.lokakarya.backend.service.GroupService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.wrapper.GroupWrapper;

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
@RequestMapping(path = "/groups")
public class GroupController {
    @Autowired
    GroupService groupService;
    
    // get
    @GetMapping(path = "/findAll")
    DataResponseList<GroupWrapper> findAll(){
        return new DataResponseList<GroupWrapper>(groupService.findAll());
    }
    @GetMapping(path = "/getById")
    DataResponse<GroupWrapper> getById(@RequestParam("id") Long id){
        return new DataResponse<GroupWrapper>(groupService.getById(id));
    }
    @GetMapping(path = "/getByGroupName")
    DataResponse<GroupWrapper> getByGroupName(@RequestParam("groupName") String groupName){
        return new DataResponse<GroupWrapper>(groupService.getByGroupName(groupName));
    }

    // post & update
    @PostMapping(path = "/post")
    DataResponse<GroupWrapper> post(@RequestBody GroupWrapper wrapper){
        return new DataResponse<GroupWrapper>(groupService.save(wrapper));
    }

    @PutMapping(path = "/update")
    DataResponse<GroupWrapper> update(@RequestBody GroupWrapper wrapper){
        return new DataResponse<GroupWrapper>(groupService.save(wrapper));
    }

    // delete
    @DeleteMapping(path = "/delete")
    DataResponse<GroupWrapper> delete(@RequestParam("id") Long id){
        return new 
    }    
}
