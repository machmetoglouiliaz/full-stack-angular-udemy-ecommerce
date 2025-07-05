package com.mourat.udemy.spring_boot_ecommerce.controller;

import com.mourat.udemy.spring_boot_ecommerce.dto.PaymentInfo;
import com.mourat.udemy.spring_boot_ecommerce.dto.Purchase;
import com.mourat.udemy.spring_boot_ecommerce.dto.PurchaseResponse;
import com.mourat.udemy.spring_boot_ecommerce.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException{

        PaymentIntent paymentIntent = checkoutService.createPaymentIntent(paymentInfo);

        String paymentIntentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentIntentStr, HttpStatus.OK);
    }
}
