package com.lokakarya.backend.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Id;

//import javax.persistence.MappedSuperclass;

public class JobHistoryId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4907182680249802382L;

	private Long employeeId;
	private Date startDate;

	public JobHistoryId() {
		super();
	}

	public JobHistoryId(Long employeeId, Date startDate) {
		super();
		this.employeeId = employeeId;
		this.startDate = startDate;
	}

	@Override
	public int hashCode() {
		return Objects.hash(employeeId, startDate);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		JobHistoryId other = (JobHistoryId) obj;
		return Objects.equals(employeeId, other.employeeId) && Objects.equals(startDate, other.startDate);
	}

	@Id
	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	@Id
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

}
