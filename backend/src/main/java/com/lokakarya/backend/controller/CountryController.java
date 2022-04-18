package com.lokakarya.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lokakarya.backend.entity.Country;
import com.lokakarya.backend.service.CountryService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.CountryWrapper;

@CrossOrigin
@RestController
@RequestMapping (value = "/country")
public class CountryController {
	
	@Autowired
	CountryService countryService;
	
	// @GetMapping(path = "/getById")
	// public DataResponse<CountryWrapper> getByCountryId(@RequestParam("id") String countryId){
	// 	return new DataResponse<CountryWrapper>(countryService.getByCountryId(countryId));
	// }
	
	@GetMapping(path = "/findAll")
	public DataResponseList<CountryWrapper> findAll(){
		return new DataResponseList<CountryWrapper>(countryService.findAll());
	}
	
	@GetMapping(path = "/findAllWithPagination")
	public DataResponsePagination<CountryWrapper, Country> findAllWithPagination(@RequestParam("page")int page, @RequestParam("size")int size){
		return new DataResponsePagination<CountryWrapper, Country>(countryService.findAllWithPagination(page, size));
	}
	
	@GetMapping(path = "/findByCountryName")
	public DataResponsePagination<CountryWrapper, Country> findByCountryName(@RequestParam("countryName") String countryName, @RequestParam("page")int page, @RequestParam("size")int size){
		return new DataResponsePagination<CountryWrapper, Country>(countryService.findByCountryNameContaining(countryName, page, size));
	}

	//find country Name without pagination
	@GetMapping(path = "/findCountryByName")
	public DataResponseList<CountryWrapper> findCountryByName(@RequestParam("countryName") String countryName){
		return new DataResponseList<CountryWrapper>(countryService.findByCountryNameContaining(countryName));
	}
	
	
	@DeleteMapping(path = "/{id}")
	public void delete(@PathVariable("id") String countryId) {
		countryService.delete(countryId);
	}
	
	@PostMapping(path="/post")
	public DataResponse<CountryWrapper> save(@RequestBody CountryWrapper wrapper) {
		return new DataResponse<CountryWrapper>(countryService.save(wrapper));
	}

	@PutMapping(path="/put")
	public DataResponse<CountryWrapper> update(@RequestBody CountryWrapper wrapper) {
		return new DataResponse<CountryWrapper>(countryService.save(wrapper));
	}
}
