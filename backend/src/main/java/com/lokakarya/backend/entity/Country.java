package com.lokakarya.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "COUNTRIES")
public class Country {
    private String countryId;
    private String countryName;
    private Region region;

    @Id
    @Column(name = "COUNTRY_ID")
    public String getCountryId() {
        return countryId;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    @Column(name = "COUNTRY_NAME")
    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    @ManyToOne
    @JoinColumn(name = "REGION_ID")
    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }
}
