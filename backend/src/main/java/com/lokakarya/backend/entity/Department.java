package com.lokakarya.backend.entity;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "DEPARTMENTS")
public class Department {
    @Id
    @GeneratedValue(generator = "DEPARTMENT_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "DEPARTMENT_GEN", sequenceName = "DEPARTMENTS_SEQ", allocationSize = 1)
    private Long departmentId;
    @Column(name = "DEPARTMENT_NAME")
    private String departmentName;
    @ManyToOne
    @JoinColumn(name = "LOCATION_ID")
    private Location location;
    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    private Employee manager;
}
