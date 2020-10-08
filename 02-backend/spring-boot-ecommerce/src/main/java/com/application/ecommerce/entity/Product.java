package com.application.ecommerce.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

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

	public Product()
	{

	}

	public Product(long id,String sku, String name, String description, double unitPrice, String imageUrl, boolean active, int unitInStock, Date dateCreated, Date lastUpdate) {
		this.id= id;
	    this.sku = sku;
		this.name = name;
		this.description = description;
		this.unitPrice = unitPrice;
		this.imageUrl = imageUrl;
		this.active = active;
		this.unitInStock = unitInStock;
		this.dateCreated = dateCreated;
		this.lastUpdate = lastUpdate;
	}

    public Product(String sku, String name, String description, double unitPrice, String imageUrl, boolean active, int unitInStock, Date dateCreated, Date lastUpdate) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.active = active;
        this.unitInStock = unitInStock;
        this.dateCreated = dateCreated;
        this.lastUpdate = lastUpdate;
    }

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public int getUnitInStock() {
		return unitInStock;
	}

	public void setUnitInStock(int unitInStock) {
		this.unitInStock = unitInStock;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public ProductCategory getCategory() {
		return category;
	}

	public void setCategory(ProductCategory category) {

		System.out.println("set Category  "+category);
		ProductCategory tempCategory=new ProductCategory();
		tempCategory.setId(category.getId());
		tempCategory.setCategoryName(category.getCategoryName());
		this.category = tempCategory;
		System.out.println("this . set Category  "+this.category);
	}
}
