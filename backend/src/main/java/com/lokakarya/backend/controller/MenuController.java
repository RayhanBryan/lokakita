package com.lokakarya.backend.controller;

import com.lokakarya.backend.service.MenuService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.wrapper.MenuWrapper;

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
@RequestMapping(path = "/menus")
public class MenuController {
    @Autowired
    MenuService menuService;

    // get
    @GetMapping(path = "/findAll")
    public DataResponseList<MenuWrapper> findAll(){
        return new DataResponseList<MenuWrapper>(menuService.findAll());
    }
    @GetMapping(path = "/getById")
    public DataResponse<MenuWrapper> getById(@RequestParam("id") Long id){
        return new DataResponse<MenuWrapper>(menuService.getById(id));
    }
    @GetMapping(path = "/getByMenuName")
    public DataResponse<MenuWrapper> getByMenuName(@RequestParam("menuName") String menuName){
        return new DataResponse<MenuWrapper>(menuService.getByMenuName(menuName));
    }
    // post&update
    @PostMapping(path = "/post")
    public DataResponse<MenuWrapper> post(@RequestBody MenuWrapper wrapper){
        return new DataResponse<MenuWrapper>(menuService.save(wrapper));
    }
    @PutMapping(path = "/put")
    public DataResponse<MenuWrapper> update(@RequestBody MenuWrapper wrapper){
        return new DataResponse<MenuWrapper>(menuService.save(wrapper));
    }
    // delete
    @DeleteMapping(path = "/delete")
    public DataResponse<MenuWrapper> delete(@RequestParam("id") Long id){
        menuService.delete(id);
        return new DataResponse<>(true,"Delete data sukses.");
    }

}
