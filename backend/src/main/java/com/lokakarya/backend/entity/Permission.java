package com.lokakarya.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "PERMISSIONS")
public class Permission {
    @Id
    @GeneratedValue(generator = "PERMISSIONS_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "PERMISSIONS_GEN", sequenceName = "PERMISSION_SEQ",initialValue = 1, allocationSize = 1)
    @Column(name = "PERMISSION_ID")
    private Long permissionId;
    private String permission;
    private String note;


    public Long getPermissionId() {
        return permissionId;
    }
    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }
    public String getPermission() {
        return permission;
    }
    public void setPermission(String permission) {
        this.permission = permission;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }
    
}
