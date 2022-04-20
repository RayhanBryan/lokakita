package com.lokakarya.backend.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DepartmentWrapper {
    private Long departmentId;
    private String departmentName;
    private Long locationId;
    private Long managerId;
    private String managerFirstName;
    private String managerLastName;
    private String streetAddress;
    private String city;
}
