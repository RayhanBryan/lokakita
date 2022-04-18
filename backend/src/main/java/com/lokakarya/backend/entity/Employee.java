package com.lokakarya.backend.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "EMPLOYEES")
public class Employee {

    private Long employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Date hireDate;
    private Job job;
    private Integer salary;
    private Long commissionPct;
    private Department department;
    private Employee manager;

    @Id
    @GeneratedValue(generator = "EMPLOYEE_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "EMPLOYEE_GEN", sequenceName = "EMPLOYEES_SEQ", initialValue = 1, allocationSize = 1)
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    @Column(name = "FIRST_NAME")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    @Column(name = "EMAIL")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @Column(name = "PHONE_NUMBER")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Column(name = "HIRE_DATE")
    @Temporal(TemporalType.DATE)
    public Date getHireDate() {
        return hireDate;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }
    @ManyToOne
    @JoinColumn(name = "JOB_ID")
    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    @Column(name = "SALARY")
    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }
    @Column(name = "COMMISSION_PCT")
    public Long getCommissionPct() {
        return commissionPct;
    }

    public void setCommissionPct(Long commissionPct) {
        this.commissionPct = commissionPct;
    }
    @ManyToOne
    @JoinColumn(name = "DEPARTMENT_ID")
    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }
}
