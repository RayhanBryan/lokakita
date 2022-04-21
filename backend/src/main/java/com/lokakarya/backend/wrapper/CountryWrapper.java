package com.lokakarya.backend.wrapper;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CountryWrapper {
    private String countryId;
    private String countryName;
    private Long regionId;
    private String regionName;
}