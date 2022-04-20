package com.lokakarya.backend.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomerWrapper {
    private Long customerId;
    private String email;
    private String customerName;
    private String phoneNumber;
}
