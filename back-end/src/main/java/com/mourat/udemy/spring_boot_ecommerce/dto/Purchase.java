package com.mourat.udemy.spring_boot_ecommerce.dto;

import com.mourat.udemy.spring_boot_ecommerce.entity.Address;
import com.mourat.udemy.spring_boot_ecommerce.entity.Customer;
import com.mourat.udemy.spring_boot_ecommerce.entity.Order;
import com.mourat.udemy.spring_boot_ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
