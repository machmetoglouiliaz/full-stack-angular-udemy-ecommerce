package com.mourat.udemy.spring_boot_ecommerce.service;

import com.mourat.udemy.spring_boot_ecommerce.dto.Purchase;
import com.mourat.udemy.spring_boot_ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
