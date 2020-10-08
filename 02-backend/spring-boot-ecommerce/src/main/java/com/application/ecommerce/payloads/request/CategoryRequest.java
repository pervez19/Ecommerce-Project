package com.application.ecommerce.payloads.request;

import javax.validation.constraints.NotBlank;

public class CategoryRequest {

    private long id;

    @NotBlank
    private String categoryName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public String toString() {
        return "CategoryRequest{" +
                "id=" + id +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
