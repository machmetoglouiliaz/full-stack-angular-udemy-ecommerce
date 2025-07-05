package com.mourat.udemy.spring_boot_ecommerce.dto;

import lombok.Data;

@Data
public class PaymentInfo {

    private int amount;
    private String currency;
    private String receiptEmail;
}
