package com.mourat.udemy.spring_boot_ecommerce.dao;


import com.mourat.udemy.spring_boot_ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
