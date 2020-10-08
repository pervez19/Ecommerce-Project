package com.application.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="PRODUCT_CATEGORY")
@Getter
@Setter
public class ProductCategory {

	@Id
	@Column(name="id")
	@SequenceGenerator(name="sequence",sequenceName="PRODUCT_CATEGORY_SEQ",allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="sequence")
	private long id;
	
	
	@Column(name="CATEGORY_NAME")
	private String categoryName;


	@OneToMany(mappedBy="category",cascade=CascadeType.ALL)
	private List<Product> products;


	public ProductCategory()
	{

	}
	public ProductCategory(String categoryName)
	{
	this.categoryName=categoryName;
	}


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

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return "ProductCategory{" +
				"id=" + id +
				", categoryName='" + categoryName + '\'' +
				", products=" + products +
				'}';
	}


	public void add(Product product)
	{
		if( products==null)
		{
			products=new ArrayList<Product>();
		}
		products.add(product);
		product.setCategory(this);
	}
}
