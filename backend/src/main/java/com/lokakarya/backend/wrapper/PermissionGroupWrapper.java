package com.lokakarya.backend.wrapper;

public class PermissionGroupWrapper {
    private Long permissionGroupId;
    private Long groupId;
    private String groupName;
    private Long permissionId;
    private String permission;
    
    public Long getPermissionGroupId() {
        return permissionGroupId;
    }
    public void setPermissionGroupId(Long permissionGroupId) {
        this.permissionGroupId = permissionGroupId;
    }
    public Long getGroupId() {
        return groupId;
    }
    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }
    public String getGroupName() {
        return groupName;
    }
    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
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
    
}
