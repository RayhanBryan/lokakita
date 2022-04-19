package com.lokakarya.backend.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "LOCATIONS")
@Getter
@Setter
public class Location {

    @Id
    @GeneratedValue(generator = "LOCATION_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "LOCATION_GEN", sequenceName = "LOCATIONS_SEQ_01", initialValue = 1, allocationSize = 1)
    private Long locationId;
    @Column(name = "STREET_ADDRESS")
    private String streetAddress;
    @Column(name = "POSTAL_CODE")
    private String postalCode;
    @Column(name = "CITY")
    private String city;
    @Column(name = "STATE_PROVINCE")
    private String stateProvince;
    @Column(name = "CREATED_DATE")
    @Temporal(TemporalType.DATE)
    private Date createdDate;
    @ManyToOne
    @JoinColumn(name = "COUNTRY_ID")
    private Country country;

    }
