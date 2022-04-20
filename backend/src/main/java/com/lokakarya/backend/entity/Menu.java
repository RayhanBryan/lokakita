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

@Data
@NoArgsConstructor
@Entity
@Table(name = "MENUS")
public class Menu {
    @Id
    @GeneratedValue(generator = "MENUS_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "MENUS_GEN", sequenceName = "MENU_SEQ",initialValue = 1, allocationSize = 1)
    @Column(name = "MENU_ID")
    private Long menuId;
    @Column(name = "MENU_NAME")
    private String menuName;
    @Column(name = "ICON")
    private String icon;
    @Column(name = "URL")
    private String url;
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
