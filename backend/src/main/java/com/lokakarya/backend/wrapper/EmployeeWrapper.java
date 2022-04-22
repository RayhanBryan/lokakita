package com.lokakarya.backend.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class EmployeeWrapper {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String phoneNumber;
    private Date hireDate;
    private String jobId;
    private Integer salary;
    private Long commissionPct;
    private Long managerId;
    private Long departmentId;
    private String jobTitle;
    private String departmentName;
    private String managerName;
}
