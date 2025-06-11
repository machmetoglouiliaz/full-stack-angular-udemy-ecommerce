package com.mourat.udemy.spring_boot_ecommerce.dao;

import com.mourat.udemy.spring_boot_ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins="*")
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByProductCategoryId(@Param("id") Long id, Pageable pageable);
}
