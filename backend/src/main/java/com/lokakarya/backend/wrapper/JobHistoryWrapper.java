package com.lokakarya.backend.wrapper;
import java.util.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JobHistoryWrapper {
    private Long employeeId;
	private Date startDate;
	private Date endDate;
	private String jobId;
	private String jobTitle;
	private Long departmentId;
	private String departmentName;
}
