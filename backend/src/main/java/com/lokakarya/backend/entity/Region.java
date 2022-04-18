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
    private Long regionIdLong;
    private String regionNameString;

    @Id
    @GeneratedValue(generator = "REGION_GEN", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "REGION_GEN", sequenceName = "REGIONS_SEQ_01", initialValue = 1, allocationSize = 1)
    public Long getRegionId() {
        return regionIdLong;
    }
    public void setRegionId(Long regionLong) {
        this.regionIdLong = regionLong;
    }
    @Column(name = "REGION_NAME")
    public String getRegionName() {
        return regionNameString;
    }
    public void setRegionName(String regionNameString) {
        this.regionNameString = regionNameString;
    }
}
