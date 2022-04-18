package com.lokakarya.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "REGIONS")
public class Region {
    private Long regionId;
    private String regionName;

    @Id
    @GeneratedValue(generator = "REGION_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "REGION_GEN", sequenceName = "REGIONS_SEQ_01", initialValue = 1, allocationSize = 1)
    public Long getRegionId() {
        return regionId;
    }
    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }

    @Column(name = "REGION_NAME")
    public String getRegionName() {
        return regionName;
    }
    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

}
