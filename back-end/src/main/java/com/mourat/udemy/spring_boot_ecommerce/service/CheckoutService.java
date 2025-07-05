package com.mourat.udemy.spring_boot_ecommerce.service;

import com.mourat.udemy.spring_boot_ecommerce.dto.PaymentInfo;
import com.mourat.udemy.spring_boot_ecommerce.dto.Purchase;
import com.mourat.udemy.spring_boot_ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
