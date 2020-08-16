package com.application.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.ecommerce.entity.Product;

@CrossOrigin
public interface ProductRepository extends JpaRepository<Product,Long> {

}
