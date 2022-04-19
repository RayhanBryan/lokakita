package com.lokakarya.backend.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USERS")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(generator = "USERS_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "USERS_GEN", sequenceName = "USER_SEQ",initialValue = 1, allocationSize = 1)
    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "USERNAME")
    private String username;
    @Column(name = "PASSWORD")
    private String password;
    @Column(name="USER_NAME")
    private String name;
    @Column(name="ADDRESS")
    private String address;
    @Column(name = "EMAIL")
    private String email;
    @Column(name="PHONE")
    private String phone;
    @Column(name = "PROGRAM_NAME")
    private String programName;
    @Column(name="CREATED_DATE")
    @Temporal(TemporalType.DATE)
    private Date createdDate;
    @Column(name = "CREATED_BY")
    private String createdBy;
    @Column(name = "UPDATED_DATE")
    @Temporal(TemporalType.DATE)
    private Date updatedDate;
    @Column(name = "UPDATED_BY")
    private String updatedBy;
}
