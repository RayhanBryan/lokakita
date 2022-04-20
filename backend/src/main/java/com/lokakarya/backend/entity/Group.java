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

@Entity
@Table(name = "GROUPS")
@Data
@NoArgsConstructor
public class Group {
    
    @Id
    @GeneratedValue(generator = "GROUPS_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "GROUPS_GEN", sequenceName = "GROUP_SEQ",initialValue = 1, allocationSize = 1)
    @Column(name = "GROUP_ID")
    private Long groupId;
    @Column(name = "GROUP_NAME")
    private String groupName;
    @Column(name = "PROGRAM_NAME")
    private String programName;
    @Column(name = "CREATED_DATE")
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
