package com.application.ecommerce.service;

import com.application.ecommerce.entity.ProductCategory;

public interface CategoryService {

    public boolean saveCategory(ProductCategory productCategory);

    public boolean deleteCategory(Long id);

    public ProductCategory getCategoryByID(Long id);
}
