package com.lokakarya.backend.controller;

import com.lokakarya.backend.service.UserService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.wrapper.UserWrapper;

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
@RequestMapping(path = "/users")
public class UserController {
    @Autowired
    UserService userService;

    // get
    @GetMapping(path = "/findAll")
    DataResponseList<UserWrapper> findAll(){
        return new DataResponseList<UserWrapper>(userService.findAll());
    }
    @GetMapping(path = "/getById")
    DataResponse<UserWrapper> getById(@RequestParam("id") Long id){
        return new DataResponse<UserWrapper>(userService.getById(id));
    }
    @GetMapping(path = "/getByUsername")
    DataResponse<UserWrapper> getByUsername(@RequestParam("username") String username){
        UserWrapper hasil = userService.getByUsername(username);
        if(hasil == null) return new DataResponse<UserWrapper>(false,"GA ADA USERNYA");
        return new DataResponse<UserWrapper>(hasil);
    }
    @GetMapping(path = "/findByUsername")
    DataResponseList<UserWrapper> findByUsername(@RequestParam("username") String username){
        return new DataResponseList<UserWrapper>(userService.findByUsername(username));
    }
    // Post & Put
    @PostMapping(path= "/post")
    DataResponse<UserWrapper> post(@RequestBody UserWrapper wrapper){
        return new DataResponse<UserWrapper>(userService.save(wrapper));
    }
    @PutMapping(path = "/put")
    DataResponse<UserWrapper> update(@RequestBody UserWrapper wrapper){
        return new DataResponse<UserWrapper>(userService.save(wrapper));
    }
    @DeleteMapping(path = "/delete")
    DataResponse<UserWrapper> delete(@RequestParam("id") Long id){
        userService.delete(id);
        return new DataResponse<UserWrapper>(true, "Delete Sukses");
    }
}
