package com.lokakarya.backend.controller;

import com.lokakarya.backend.entity.Region;
import com.lokakarya.backend.service.RegionService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.RegionWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/regions")
public class RegionController {
	
	@Autowired
	RegionService regionService;

	@RequestMapping(path = "/getById", method = RequestMethod.GET)
	public DataResponse<RegionWrapper> getByRegionId(@RequestParam("id") Long regionId) {
		return new DataResponse<RegionWrapper>(regionService.getByRegionId(regionId));
	}
	
	@RequestMapping(path = "/findAll", method = RequestMethod.GET)
	public DataResponseList<RegionWrapper> findAll() {
		return new DataResponseList<RegionWrapper>(regionService.findAll());
	}
	
	@GetMapping(path = "/findAllWithPagination")
	public DataResponsePagination<RegionWrapper, Region> findAllWithPagination(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return new DataResponsePagination<RegionWrapper, Region>(regionService.findaAllWithPagination(page, size));
	}
	
	@GetMapping(path = "/findByRegionName")
	public DataResponsePagination<RegionWrapper, Region> findByDepartmentName(
			@RequestParam("regionName") String regionName, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		return new DataResponsePagination<RegionWrapper, Region>(regionService.findByRegionNameContaining(regionName, page, size));
	}
	
	@DeleteMapping(path = "/{id}")
	public void delete(@PathVariable("id") Long regionId) {
		regionService.delete(regionId);
	}
	
	@PostMapping(path="/post")
	public DataResponse<RegionWrapper> save(@RequestBody RegionWrapper wrapper) {
		return new DataResponse<RegionWrapper>(regionService.save(wrapper));
	}
	
	@PutMapping(path="/put")
	public DataResponse<RegionWrapper> update(@RequestBody RegionWrapper wrapper) {
		return new DataResponse<RegionWrapper>(regionService.save(wrapper));
	}
	
}
