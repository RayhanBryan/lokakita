package com.lokakarya.backend.wrapper;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JobWrapper {
    private String jobId;
	private String jobTitle;
	private Long minSalary;
	private Long maxSalary;
}
