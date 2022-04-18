package com.lokakarya.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lokakarya.backend.entity.JobHistory;
import com.lokakarya.backend.service.JobHistoryService;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.JobHistoryWrapper;


@CrossOrigin
@RestController
@RequestMapping(value = "/jobhistory")
public class JobHistoryController {

	@Autowired
	JobHistoryService jobHistoryService;

	@GetMapping(path = "/getById")
	public DataResponseList<JobHistoryWrapper> getByEmployeeId(@RequestParam("id") Long employeeId) {
		return new DataResponseList<JobHistoryWrapper>(jobHistoryService.getByEmployeeId(employeeId));
	}

	@GetMapping(path = "/findAll")
	public DataResponseList<JobHistoryWrapper> findAll() {
		return new DataResponseList<JobHistoryWrapper>(jobHistoryService.findAll());
	}

	@GetMapping(path = "/findAllWithPagination")
	public DataResponsePagination<JobHistoryWrapper, JobHistory> findAllWithPagination(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return new DataResponsePagination<JobHistoryWrapper, JobHistory>(jobHistoryService.findAllWithPagination(page, size));
	}
}
