package com.application.ecommerce.rest;

import com.application.ecommerce.entity.Product;
import com.application.ecommerce.entity.ProductCategory;
import com.application.ecommerce.payloads.request.CategoryRequest;
import com.application.ecommerce.payloads.request.ProductRequest;
import com.application.ecommerce.service.CategoryService;
import com.application.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path="/api/admin", produces = "application/json")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public Page<Product> getProduct(@RequestParam  Pageable pageable) {
        return productService.getProducts(pageable);
    }



    @PostMapping  ("/post")
    public boolean saveProduct( @Valid @RequestBody ProductRequest productrequest ) {
        System.out.println(" Product request = "+productrequest);

        Product product=new Product(productrequest.getId(),productrequest.getSku(),productrequest.getName(),productrequest.getDescription(),
                productrequest.getUnitPrice(),productrequest.getImageUrl(),productrequest.isActive(),
                productrequest.getUnitInStock(),productrequest.getDateCreated(),productrequest.getLastUpdate());

        ProductCategory productCategory = new ProductCategory();
        productCategory.setId(productrequest.getCategory().getId());
       productCategory.setCategoryName(productrequest.getCategory().getCategoryName());
        productCategory.add(product);
        return productService.saveProduct(product);
    }


    @DeleteMapping("/{product_id}")
    public boolean deleteProduct(@PathVariable("product_id") long product_id) {
        return productService.deleteProduct(product_id);
    }

    @GetMapping("/{product_id}")
    public Product allProductByID(@PathVariable("product_id") long product_id, Product product) {

        return productService.getProductByID(product_id);

    }

//    @PostMapping("/{product_id}")
//    public boolean updateProduct(@RequestBody Product product,@PathVariable("product_id") long product_id) {
//        product.setId(product_id);
//        return productService.updateProduct(product);
//    }

    @PostMapping  ("/category")
    public boolean saveCategory( @Valid @RequestBody CategoryRequest categoryRequest ) {
        System.out.println(" Product request = "+categoryRequest);
        ProductCategory productCategory=new ProductCategory(categoryRequest.getCategoryName());
        return categoryService.saveCategory(productCategory);
    }



}
