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
@Table(name="GROUP_MENU")
public class GroupMenu {
    private Long groupMenuId;
    private Group group;
    private Menu menu;
    private Character isActive;
    private String programName;
    private Date createdDate;
    private String createdBy;
    private Date updatedDate;
    private String updatedBy;
    
    public GroupMenu() {

    }
    @Id
    @GeneratedValue(generator = "GROUP_MENU_GEN", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "GROUP_MENU_GEN", sequenceName = "GROUP_MENU_SEQ_", initialValue = 1, allocationSize = 1)
    public Long getGroupMenuId() {
        return groupMenuId;
    }

    public void setGroupMenuId(Long groupMenuId) {
        this.groupMenuId = groupMenuId;
    }

    @ManyToOne
    @JoinColumn (name = "GROUP_ID")
    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    @ManyToOne
    @JoinColumn (name = "MENU_ID")
    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Character getIsActive() {
        return isActive;
    }
    public void setIsActive(Character isActive) {
        this.isActive = isActive;
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
