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

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "USERS")
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

    // public Long getUserId() {
    //     return userId;
    // }
    // public void setUserId(Long userId) {
    //     this.userId = userId;
    // }
    // public String getUsername() {
    //     return username;
    // }
    // public void setUsername(String username) {
    //     this.username = username;
    // }
    // public String getPassword() {
    //     return password;
    // }
    // public void setPassword(String password) {
    //     this.password = password;
    // }
    // public String getName() {
    //     return name;
    // }
    // public void setName(String name) {
    //     this.name = name;
    // }
    // public String getAddress() {
    //     return address;
    // }
    // public void setAddress(String address) {
    //     this.address = address;
    // }
    // public String getEmail() {
    //     return email;
    // }
    // public void setEmail(String email) {
    //     this.email = email;
    // }
    // public String getPhone() {
    //     return phone;
    // }
    // public void setPhone(String phone) {
    //     this.phone = phone;
    // }
    // public String getProgramName() {
    //     return programName;
    // }
    // public void setProgramName(String programName) {
    //     this.programName = programName;
    // }
    // public Date getCreatedDate() {
    //     return createdDate;
    // }
    // public void setCreatedDate(Date createdDate) {
    //     this.createdDate = createdDate;
    // }
    // public String getCreatedBy() {
    //     return createdBy;
    // }
    // public void setCreatedBy(String createdBy) {
    //     this.createdBy = createdBy;
    // }
    // public Date getUpdatedDate() {
    //     return updatedDate;
    // }
    // public void setUpdatedDate(Date updatedDate) {
    //     this.updatedDate = updatedDate;
    // }
    // public String getUpdatedBy() {
    //     return updatedBy;
    // }
    // public void setUpdatedBy(String updatedBy) {
    //     this.updatedBy = updatedBy;
    // }

    
}
