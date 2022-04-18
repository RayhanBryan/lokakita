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
import com.lokakarya.backend.entity.Job;
import com.lokakarya.backend.service.JobService;
import com.lokakarya.backend.util.DataResponse;
import com.lokakarya.backend.util.DataResponseList;
import com.lokakarya.backend.util.DataResponsePagination;
import com.lokakarya.backend.wrapper.JobWrapper;

@CrossOrigin
@RestController
@RequestMapping(value = "/jobs")
public class JobController {

	@Autowired
	JobService jobService;

	@GetMapping(path = "/getById")
	public DataResponse<JobWrapper> getByJobId(@RequestParam("id") String jobId) {
		return new DataResponse<JobWrapper>(jobService.getByJobId(jobId));
	}

	@GetMapping(path = "/findAll")
	public DataResponseList<JobWrapper> findAll() {
		return new DataResponseList<JobWrapper>(jobService.findAll());
	}

	@GetMapping(path = "/findAllWithPagination")
	public DataResponsePagination<JobWrapper, Job> findAllWithPagination(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return new DataResponsePagination<JobWrapper, Job>(jobService.findAllWithPagination(page, size));
	}

	@GetMapping(path = "/findByJobTitle")
	public DataResponsePagination<JobWrapper, Job> findByJobTitle(
			@RequestParam("jobTitle") String jobTitle, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		return new DataResponsePagination<JobWrapper, Job>(
				jobService.findByJobTitleContaining(jobTitle, page, size));
	}

	@DeleteMapping(path = "/{id}")
	public void delete(@PathVariable("id") String jobId) {
		jobService.delete(jobId);
	}

	@PostMapping(path = "/post")
	public DataResponse<JobWrapper> save(@RequestBody JobWrapper wrapper) {
		return new DataResponse<JobWrapper>(jobService.save(wrapper));
	}

	@PutMapping(path = "/put")
	public DataResponse<JobWrapper> update(@RequestBody JobWrapper wrapper) {
		return new DataResponse<JobWrapper>(jobService.save(wrapper));
	}
}
