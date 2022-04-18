package com.lokakarya.backend.entity;


import javax.persistence.*;

@Entity
@Table(name = "DEPARTMENTS")
public class Department {
    private Long departmentId;
    private String departmentName;
    private Location location;
    private Employee manager;


    @Id
    @GeneratedValue(generator = "DEPARTMENT_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "DEPARTMENT_GEN", sequenceName = "DEPARTMENTS_SEQ", initialValue = 1, allocationSize = 1)
    public Long getDepartmentId() {
        return departmentId;
    }
    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
    @Column(name = "DEPARTMENT_NAME")
    public String getDepartmentName() {
        return departmentName;
    }
    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }


    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    public Employee getManager() {
        return manager;
    }
    public void setManager(Employee manager) {
        this.manager = manager;
    }

    @ManyToOne
    @JoinColumn(name = "LOCATION_ID")
    public Location getLocation() {
        return location;
    }
    public void setLocation(Location location) {
        this.location = location;
    }
}
