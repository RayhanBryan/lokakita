package com.lokakarya.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lokakarya.backend.entity.Department;
import com.lokakarya.backend.entity.Job;
import com.lokakarya.backend.entity.JobHistory;
import com.lokakarya.backend.repository.DepartmentRepository;
import com.lokakarya.backend.repository.JobHistoryRepository;
import com.lokakarya.backend.repository.JobRepository;
import com.lokakarya.backend.util.PaginationList;
import com.lokakarya.backend.wrapper.JobHistoryWrapper;


@Service
@Transactional
public class JobHistoryService {

	@Autowired
	JobHistoryRepository jobHistoryRepository;
	@Autowired
	JobRepository jobRepository;
	@Autowired
	DepartmentRepository departmentRepository;

	// retrieve single item
	public JobHistoryWrapper getByEmployeeId(Long employeeId) {
		JobHistory employee = jobHistoryRepository.getById(employeeId);
		return toWrapper(employee);
	}

	private JobHistoryWrapper toWrapper(JobHistory entity) {
		JobHistoryWrapper wrapper = new JobHistoryWrapper();
		wrapper.setEmployeeId(entity.getEmployeeId());
		wrapper.setStartDate(entity.getStartDate());
		wrapper.setEndDate(entity.getEndDate());
		wrapper.setJobId(entity.getJob() != null ? entity.getJob().getJobId() : null);
		wrapper.setJobTitle(entity.getJob() != null ? entity.getJob().getJobTitle() : null);
		wrapper.setDepartmentId(entity.getDepartment() != null ? entity.getDepartment().getDepartmentId() : null);
		wrapper.setDepartmentName(entity.getDepartment() != null ? entity.getDepartment().getDepartmentName() : null);
		return wrapper;
	}

	// retrieve
	public List<JobHistoryWrapper> findAll() {
		List<JobHistory> jobHistoryList = jobHistoryRepository.findAll();
		return toWrapperList(jobHistoryList);
	}

	private List<JobHistoryWrapper> toWrapperList(List<JobHistory> entityList) {
		List<JobHistoryWrapper> wrapperList = new ArrayList<JobHistoryWrapper>();
		for (JobHistory entity : entityList) {
			JobHistoryWrapper wrapper = toWrapper(entity);
			wrapperList.add(wrapper);
		}
		return wrapperList;
	}

	public PaginationList<JobHistoryWrapper, JobHistory> findAllWithPagination(int page, int size) {
		Pageable paging = PageRequest.of(page, size);
		Page<JobHistory> jobHistoryPage = jobHistoryRepository.findAll(paging);
		List<JobHistory> jobHistoryList = jobHistoryPage.getContent();
		List<JobHistoryWrapper> jobWrapperList = toWrapperList(jobHistoryList);
		return new PaginationList<JobHistoryWrapper, JobHistory>(jobWrapperList, jobHistoryPage);
	}
