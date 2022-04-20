package com.lokakarya.backend.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table (name="HAK_AKSES")
public class HakAkses {
    @Id
    @GeneratedValue(generator = "HAK_AKSES_GEN", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "HAK_AKSES_GEN", sequenceName = "HAK_AKSES_SEQ", initialValue = 1, allocationSize = 1)
    @Column (name = "HAK_AKSES_ID")
    private Long hakAksesId;

    @ManyToOne
    @JoinColumn (name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn (name = "GROUP_ID")
    private Group group;

    @Column (name = "PROGRAM_NAME")
    private String programName;

    @Column (name = "CREATED_DATE")
    @Temporal(TemporalType.DATE)
    private Date createdDate;

    @Column (name = "CREATED_BY")
    private String createdBy;

    @Column (name = "UPDATED_DATE")
    private Date updatedDate;

    @Column (name = "UPDATED_BY")
    private String updatedBy;

    @Column (name = "IS_ACTIVE")
    private Character isActive;
}
