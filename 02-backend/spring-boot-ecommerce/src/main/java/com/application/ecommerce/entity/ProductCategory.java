package com.application.ecommerce.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="PRODUCT_CATEGORY")
@Getter
@Setter
public class ProductCategory {

	@Id
	@Column(name="ID")
	@SequenceGenerator(name="sequence",sequenceName="PRODUCT_CATEGORY_SEQ",allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="sequence")
	private long Id;
	
	
	@Column(name="CATEGORY_NAME")
	private String categoryName;
	
	@OneToMany(mappedBy="category",cascade=CascadeType.ALL)
	private List<Product> products;
}
