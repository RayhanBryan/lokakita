package com.lokakarya.backend.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "JOB_HISTORY")
@IdClass(JobHistoryId.class)
public class JobHistory {
	@Id
	@Column(name = "EMPLOYEE_ID")
	private Long employeeId;
	@Id
	@Column
	@Temporal(TemporalType.DATE)
	private Date startDate;
	@Column
	@Temporal(TemporalType.DATE)
	private Date endDate;
	@ManyToOne
	@JoinColumn(name = "JOB_ID")
	private Job job;
	@ManyToOne
	@JoinColumn(name = "DEPARTMENT_ID")
	private Department department;
}
