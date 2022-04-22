package com.lokakarya.backend.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PermissionGroupWrapper {
    private Long permissionGroupId;
    private Long groupId;
    private String groupName;
    private Long permissionId;
    private String permission;
    private Character isActive;
}
