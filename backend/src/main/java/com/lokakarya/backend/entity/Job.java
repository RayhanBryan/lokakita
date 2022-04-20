package com.lokakarya.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "JOBS")
public class Job {
    @Id
    @Column(name = "JOB_ID")
    private String jobId;
    @Column(name = "JOB_TITLE")
    private String jobTitle;
    @Column(name = "MIN_SALARY")
    private Long minSalary;
    @Column(name = "MAX_SALARY")
    private Long maxSalary;
}
