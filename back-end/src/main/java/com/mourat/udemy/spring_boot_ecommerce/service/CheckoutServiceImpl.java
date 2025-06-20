package com.mourat.udemy.spring_boot_ecommerce.service;

import com.mourat.udemy.spring_boot_ecommerce.dao.CustomerRepository;
import com.mourat.udemy.spring_boot_ecommerce.dto.Purchase;
import com.mourat.udemy.spring_boot_ecommerce.dto.PurchaseResponse;
import com.mourat.udemy.spring_boot_ecommerce.entity.Customer;
import com.mourat.udemy.spring_boot_ecommerce.entity.Order;
import com.mourat.udemy.spring_boot_ecommerce.entity.OrderItem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }
}
