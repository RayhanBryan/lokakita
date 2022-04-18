package com.lokakarya.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lokakarya.backend.entity.JobHistory;
public interface JobHistoryRepository extends JpaRepository<JobHistory,Long> {
    
}
