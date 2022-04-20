package com.lokakarya.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "PERMISSION_GROUPS")
public class PermissionGroup {
    private Long permissionGroupId;
    private Group group;
    private Permission permission;

    @Id
    @GeneratedValue(generator = "PERMISSION_GROUP_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "PERMISSION_GROUP_GEN", sequenceName = "PERMISSION_GROUP_SEQ",initialValue = 1, allocationSize = 1)
    @Column(name = "PERMISSION_GROUP_ID")
    public Long getPermissionGroupId() {
        return permissionGroupId;
    }
    public void setPermissionGroupId(Long permissionGroupId) {
        this.permissionGroupId = permissionGroupId;
    }

    @ManyToOne
    @JoinColumn(name = "GROUP_ID")
    public Group getGroup() {
        return group;
    }
    public void setGroup(Group group) {
        this.group = group;
    }

    @ManyToOne
    @JoinColumn(name = "PERMISSION_ID")
    public Permission getPermission() {
        return permission;
    }
    public void setPermission(Permission permission) {
        this.permission = permission;
    }
     
}
