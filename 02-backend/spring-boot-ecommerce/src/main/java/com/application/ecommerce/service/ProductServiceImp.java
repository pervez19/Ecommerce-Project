package com.application.ecommerce.service;

import com.application.ecommerce.dao.ProductRepository;
import com.application.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ProductServiceImp implements ProductService {

    @Autowired
    private  ProductRepository productRepository;


    @Override
    @Transactional
    public boolean saveProduct(Product product) {

        boolean status=false;
        try {
            productRepository.save(product);
            status=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }


    @Override
    @Transactional
    public Page<Product> getProducts(Pageable pageable) {

        return productRepository.findAll( pageable);
    }

    @Override
    @Transactional
    public boolean deleteProduct(Long id) {
        boolean status=false;
        try {
           productRepository.deleteById(id);
            status=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }



    @Override
    @Transactional
    public Product getProductByID(Long id) {
        Optional<Product> product= productRepository.findById(id) ;
        Product theProduct=null;
        if(product.isPresent())
        {
            theProduct=product.get();
        }
        else
        {
            throw new RuntimeException("Employee not found by this ID: "+id);
        }

        return theProduct;
    }

    @Override
    public boolean updateProduct(Product product) {
        boolean status=false;
        try {
          productRepository.save(product);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
}

