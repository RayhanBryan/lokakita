package com.lokakarya.backend.wrapper;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CountryWrapper {
    private String countryId;
    private String countryName;
    private Long regionId;
    private String regionName;

    // public String getCountryId() {
    //     return countryId;
    // }
    // public void setCountryId(String countryId) {
    //     this.countryId = countryId;
    // }
    // public String getCountryName() {
    //     return countryName;
    // }
    // public void setCountryName(String countryName) {
    //     this.countryName = countryName;
    // }
    // public Long getRegionId() {
    //     return regionId;
    // }
    // public void setRegionId(Long regionId) {
    //     this.regionId = regionId;
    // }
    // public String getRegionName() {
    //     return regionName;
    // }
    // public void setRegionName(String regionName) {
    //     this.regionName = regionName;
    // }
}