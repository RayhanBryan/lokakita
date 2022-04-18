package com.lokakarya.backend.repository;

import com.lokakarya.backend.entity.JobHistoryId;
import com.lokakarya.backend.entity.JobHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobHistoryRepository extends JpaRepository<JobHistory, JobHistoryId>{
	List<JobHistory> getByEmployeeId(Long employeeId);

} 
