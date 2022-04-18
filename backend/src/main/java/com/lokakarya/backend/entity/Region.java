package com.lokakarya.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "REGIONS")
public class Region {
    private Long regionIdLong;
    private String regionNameString;

    @Id
    @Column(name = "REGION_ID")
    public Long getRegionIdLong() {
        return regionIdLong;
    }
    public void setRegionIdLong(Long regionLong) {
        this.regionIdLong = regionLong;
    }
    @Column(name = "REGION_NAME")
    public String getRegionNameString() {
        return regionNameString;
    }
    public void setRegionNameString(String regionNameString) {
        this.regionNameString = regionNameString;
    }
}
