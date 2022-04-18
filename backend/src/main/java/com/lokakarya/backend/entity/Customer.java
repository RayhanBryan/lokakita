package com.lokakarya.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "Customer")
public class Customer {
private Long customerId;
private String email;
private String customerName;
private String phoneNumber;

    @Id
    @GeneratedValue(generator = "CUSTOMER_GEN", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "CUSTOMER_GEN", sequenceName = "CUS_SEQ", initialValue = 1, allocationSize = 1)
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
@Column(name = "EMAIL")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
@Column(name = "CUSTOMER")
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
@Column(name = "PHONE_NO")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
