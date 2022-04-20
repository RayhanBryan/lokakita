package com.lokakarya.backend.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "CUSTOMER")
public class Customer {
    @Id
    @GeneratedValue(generator = "CUSTOMER_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "CUSTOMER_GEN", sequenceName = "CUS_SEQ", initialValue = 1, allocationSize = 1)
    @Column(name = "ID")
    private Long customerId;
    @Column(name = "NAME")
    private String customerName;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;
}
