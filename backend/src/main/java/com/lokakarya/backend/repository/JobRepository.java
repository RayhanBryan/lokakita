package com.lokakarya.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lokakarya.backend.entity.Job;

public interface JobRepository extends JpaRepository<Job, String> {
	Page<Job> findByJobTitleContainingIgnoreCase(String jobTitle, Pageable paging);

}
