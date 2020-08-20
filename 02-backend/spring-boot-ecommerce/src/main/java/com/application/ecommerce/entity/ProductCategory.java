package com.application.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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
}
