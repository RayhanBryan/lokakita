package com.lokakarya.backend.entity;



import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "EMPLOYEES")
public class Employee {
    @Id
    @GeneratedValue(generator = "EMPLOYEE_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "EMPLOYEE_GEN", sequenceName = "EMPLOYEES_SEQ", allocationSize = 1)
    private Long employeeId;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column(name = "LAST_NAME")
    private String lastName;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;
    @Column(name = "HIRE_DATE")
    @Temporal(TemporalType.DATE)
    private Date hireDate;
    @ManyToOne
    @JoinColumn(name = "JOB_ID")
    private Job job;
    @Column(name = "SALARY")
    private Integer salary;
    @Column(name = "COMMISSION_PCT")
    private Long commissionPct;
    @ManyToOne
    @JoinColumn(name = "DEPARTMENT_ID")
    private Department department;
    @ManyToOne
    @JoinColumn(name ="MANAGER_ID")
    private Employee manager;
}
