package com.application.ecommerce.service;

import com.application.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {





    public boolean saveProduct(Product product);
    public Page<Product> getProducts(Pageable pageable);
    public boolean deleteProduct(Long id);

    public Product getProductByID(Long id);
    public boolean updateProduct(Product product);
}
