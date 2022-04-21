package com.lokakarya.backend.controller;

import com.lokakarya.backend.service.HakAksesService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.wrapper.HakAksesWrapper;

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
@RequestMapping(path = "/access")
public class HakAksesController {
    @Autowired
    HakAksesService hakAksesService;

      // get
      @GetMapping(path = "/findAll")
      DataResponseList<HakAksesWrapper> findAll(){
          return new DataResponseList<HakAksesWrapper>(hakAksesService.findAll());
      }
      @GetMapping(path = "/getById")
      DataResponse<HakAksesWrapper> getById(@RequestParam("id") Long id){
          return new DataResponse<HakAksesWrapper>(hakAksesService.getById(id));
      }
      @GetMapping(path = "/findByUser")
      DataResponseList<HakAksesWrapper> findByUser(@RequestParam("user") Long user){
          return new DataResponseList<HakAksesWrapper>(hakAksesService.findByUserId(user));
      }
      @GetMapping(path = "/findByGroup")
      DataResponseList<HakAksesWrapper> findByGroup(@RequestParam("group") Long group){
          return new DataResponseList<HakAksesWrapper>(hakAksesService.findByGroupId(group));
      }
      @GetMapping(path = "/findByUserIdAndGroupId")
      DataResponse<HakAksesWrapper> findByUserIdAndGroupId(@RequestParam("userId") Long userId, @RequestParam("groupId") Long groupId){
          return new DataResponse<HakAksesWrapper>(hakAksesService.findByUserIdAndGroupId(userId, groupId));
      }

      // post
      @PostMapping(path= "/post")
      DataResponse<HakAksesWrapper> post(@RequestBody HakAksesWrapper wrapper){
          return new DataResponse<HakAksesWrapper>(hakAksesService.save(wrapper));
      }

      // put
      @PutMapping(path = "/put")
      DataResponse<HakAksesWrapper> update(@RequestBody HakAksesWrapper wrapper){
          return new DataResponse<HakAksesWrapper>(hakAksesService.save(wrapper));
      }
      @PutMapping(path = "/changeIsActiveByUserIdAndGroupId")
      DataResponse<HakAksesWrapper> changeIsActive(@RequestParam("userId") Long userId, @RequestParam("groupId") Long groupId){
          return new DataResponse<HakAksesWrapper>(hakAksesService.changeIsActiveByUserIdAndGroupId(userId, groupId));
      }
      @PutMapping(path = "/putByUserIdAndGroupId")
      DataResponse<HakAksesWrapper> putUser(@RequestParam("userId") Long userId, @RequestParam("groupId") Long groupId, @RequestParam("isActive") Character isActive){
          return new DataResponse<HakAksesWrapper>(hakAksesService.putByUserIdAndGroupId(userId, groupId, isActive));
      }
      @DeleteMapping(path = "/delete")
      DataResponse<HakAksesWrapper> delete(@RequestParam("id") Long id){
          hakAksesService.delete(id);
          return new DataResponse<HakAksesWrapper>(true, "Delete Sukses");
      }
      DataResponse<HakAksesWrapper> deleteUserIdOrGroupId(@RequestParam("id") Long id){
        hakAksesService.delete(id);
        return new DataResponse<HakAksesWrapper>(true, "Delete Sukses");
    }
}
