package com.application.ecommerce.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Entity
@Table(name="PRODUCT")
@Data
public class Product {

	@Id
	@Column(name="id")
	@SequenceGenerator(name="sequence",sequenceName="PRODUCT_SEQ",allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="sequence")
	private long id;


	@Column(name="sku")
	private String sku;

	@Column(name="name")
	private String name;

	@Column(name="description")
	private String description;

	@Column(name="unit_price")
	private double unitPrice;

	@Column(name="image_url")
	private String imageUrl;

	@Column(name="active")
	private boolean active;

	@Column(name="units_in_stock")
	private int unitInStock;

	@Column(name="date_created")
	@CreationTimestamp
	private Date dateCreated;

	@Column(name="last_updated")
	@UpdateTimestamp
	private Date lastUpdate;

	@ManyToOne
	@JoinColumn(name="category_id", nullable=false)
	private ProductCategory category;
	
}
