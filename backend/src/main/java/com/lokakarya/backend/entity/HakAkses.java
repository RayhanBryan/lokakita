package com.lokakarya.backend.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table (name="HAK_AKSES")
public class HakAkses {
    private Long hakAksesId;
    private User user;
    private Group group;
    private String programName;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;

    public HakAkses(){
        
    }
    @Id
    @GeneratedValue(generator = "HAK_AKSES_GEN", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "HAK_AKSES_GEN", sequenceName = "HAK_AKSES_SEQ", initialValue = 1, allocationSize = 1)
    public Long getHakAksesId() {
        return hakAksesId;
    }

    public void setHakAksesId(Long hakAksesId) {
        this.hakAksesId = hakAksesId;
    }

    @ManyToOne
    @JoinColumn (name = "USER_ID", insertable = false, updatable = false)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn (name = "GROUP_ID", insertable = false, updatable = false)
    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

}
