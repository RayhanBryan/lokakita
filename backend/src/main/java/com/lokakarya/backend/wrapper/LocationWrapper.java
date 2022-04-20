package com.lokakarya.backend.wrapper;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationWrapper {

	private Long locationId;
	private String streetAddress;
	private String postalCode;
	private String city;
	private String stateProvince;
	private String countryId;
	private String countryName;
	private Date createdDate;
	
}

