package com.application.ecommerce.service;

import com.application.ecommerce.dao.ProductCategoryRepository;
import com.application.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;




@Service
@Transactional
public class CategoryServiceImp implements CategoryService {


    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Override
    @Transactional
    public boolean saveCategory(ProductCategory productCategory) {
        boolean status=false;
        try {
            productCategoryRepository.save(productCategory);
            status=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }

    @Override
    @Transactional
    public boolean deleteCategory(Long id) {
        boolean status=false;
        try {
            productCategoryRepository.deleteById(id);
            status=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }

    @Override
    public ProductCategory getCategoryByID(Long id) {
        return null;
    }
}
