package com.lokakarya.backend.wrapper;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWrapper {
    private Long userId;
    private String username;
    private String password;
    private String name;
    private String address;
    private String email;
    private String phone;
    private String programName;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
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
