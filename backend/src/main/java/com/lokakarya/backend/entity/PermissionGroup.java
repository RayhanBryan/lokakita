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

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "PERMISSION_GROUPS")
public class PermissionGroup {
    @Id
    @GeneratedValue(generator = "PERMISSION_GROUP_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "PERMISSION_GROUP_GEN", sequenceName = "PERMISSION_GROUP_SEQ",initialValue = 1, allocationSize = 1)
    @Column(name = "PERMISSION_GROUP_ID")
    private Long permissionGroupId;

    @ManyToOne
    @JoinColumn(name = "GROUP_ID")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "PERMISSION_ID")
    private Permission permission;

    @Column (name = "IS_ACTIVE")
    private Character isActive;
}
