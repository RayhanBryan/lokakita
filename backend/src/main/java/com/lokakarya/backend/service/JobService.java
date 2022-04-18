package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.lokakarya.backend.entity.Job;
import com.lokakarya.backend.repository.JobRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.JobWrapper;

@Service
@Transactional
public class JobService {

	@Autowired
	JobRepository jobRepository;

	// retrieve single item
	public JobWrapper getByJobId(String jobId) {
		Job job = jobRepository.getById(jobId);
		return toWrapper(job);
	}

	private JobWrapper toWrapper(Job entity) {
		JobWrapper wrapper = new JobWrapper();
		wrapper.setJobId(entity.getJobId());
		wrapper.setJobTitle(entity.getJobTitle());
		wrapper.setMinSalary(entity.getMinSalary());
		wrapper.setMaxSalary(entity.getMaxSalary());
		return wrapper;
	}

	// retrieve
	public List<JobWrapper> findAll() {
		List<Job> jobList = jobRepository.findAll();
		return toWrapperList(jobList);
	}

	private List<JobWrapper> toWrapperList(List<Job> entityList) {
		List<JobWrapper> wrapperList = new ArrayList<JobWrapper>();
		for (Job entity : entityList) {
			JobWrapper wrapper = toWrapper(entity);
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	// create and update
	public JobWrapper save(JobWrapper wrapper) {
		Job job = jobRepository.save(toEntity(wrapper));
		return toWrapper(job);
	}

	private Job toEntity(JobWrapper wrapper) {
		Job entity = new Job();
		entity.setJobId(wrapper.getJobId());
		entity.setJobTitle(wrapper.getJobTitle());
		entity.setMinSalary(wrapper.getMinSalary());
		entity.setMaxSalary(wrapper.getMaxSalary());
		return entity;
	}

	// delete
	public void delete(String id) {
		jobRepository.deleteById(id);
	}

	public PaginationList<JobWrapper, Job> findAllWithPagination(int page, int size) {
		Pageable paging = PageRequest.of(page, size);
		Page<Job> jobPage = jobRepository.findAll(paging);
		List<Job> jobList = jobPage.getContent();
		List<JobWrapper> jobWrapperList = toWrapperList(jobList);
		return new PaginationList<JobWrapper, Job>(jobWrapperList, jobPage);
	}

	public PaginationList<JobWrapper, Job> findByJobTitleContaining(String jobTitle, int page, int size) {
		Pageable paging = PageRequest.of(page, size);
		Page<Job> jobPage = jobRepository.findByJobTitleContainingIgnoreCase(jobTitle, paging);
		List<Job> jobList = jobPage.getContent();
		List<JobWrapper> jobWrapperList = toWrapperList(jobList);
		return new PaginationList<JobWrapper, Job>(jobWrapperList, jobPage);
	}

	//find job title without pagination
	public List<JobWrapper> findByJobTitleContaining(String jobTitle) {
		List<Job> job = jobRepository.findByJobTitleContainingIgnoreCase(jobTitle);
		return toWrapperList(job);
	}
}

