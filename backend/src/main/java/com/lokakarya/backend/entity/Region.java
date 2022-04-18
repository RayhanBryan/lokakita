package com.lokakarya.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "REGIONS")
public class Region {
    private Long regionId;
    private String regionName;

    @Id
    @Column(name = "REGION_ID")
    public Long getRegionId() {
        return regionId;
    }
    public void setRegionId(Long region) {
        this.regionId = region;
    }
    @Column(name = "REGION_NAME")
    public String getRegionName() {
        return regionName;
    }
    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }
}
