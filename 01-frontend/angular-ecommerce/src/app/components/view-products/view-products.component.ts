import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Subject, Observable } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {


  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,private productService : ProductService, private route:ActivatedRoute) { }  
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;


  products:Product[]=[];

  
  productData : any;

  productCategory: ProductCategory[];
  
  product : Product=new Product();  
  deleteMessage=false;  
  productlist : Product=new Product();  
  isupdated = false;      
  Pcategory : ProductCategory= new ProductCategory();
  
  ngOnInit() {  
    this.isupdated=false;  
    this.route.paramMap.subscribe(() => {this.listProducts();});
    this.listProductCategory();
  }  


  
//   openModal(template: TemplateRef<any>, data) {
//     this.productData = data
//     this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false }, this.productData);
// }

openModal(template: TemplateRef<any>, data) {
  this.productData = data
  this.modalRef = this.modalService.show(template,  this.productData);
}


  listProductCategory() {
    this.productService.getProductCategory().subscribe(
      data =>{
        this.productCategory=data;
      }
    );
  }

  listProducts() {
   
    this.productService. getProductListPaginateforAdmin(this.thePageNumber-1,
      this.thePageSize)
     .subscribe(this.processResult());
  }

   processResult() {
    return data =>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };

  }
    
  updatePageSize(pageSize:number)
  {
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProducts();

  }

  deleteProduct(id: number) {  
    this.productService.deleteProduct(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.productService. getProductListPaginateforAdmin(this.thePageNumber-1,
            this.thePageSize)
           .subscribe(this.processResult());  
        },  
        error => console.log(error));  
  }  
  
  updateProduct(id: number){  
    console.log(id);
    this.productService.getProduct(id) 
      .subscribe(  
        data => {  
          this.productlist=data             
        },  
        error => console.log(error));  

    this.productService.getCategory(id)
    .subscribe(  
      data => {  
        this.Pcategory=data             
      } ,
      error => console.log(error));
       
    console.log("product List "+this.productlist);
    console.log("Pcategory "+this.Pcategory);
  }  
  
  productupdateform=new FormGroup({  
    id:new FormControl(),  
    name :new FormControl('' , [Validators.required  ] ), 
    description :new FormControl('' , [Validators.required ] ), 
    active :new FormControl('' , [Validators.required  ] ), 
    sku  :new FormControl('' , [Validators.required  ] ), 
    unitInStock  :new FormControl('' , [Validators.required  ] ), 
    unitPrice :new FormControl('' , [Validators.required  ] ), 
    imageUrl :new FormControl('' , [Validators.required  ] ), 
    category : new FormControl('' , [Validators.required  ] ),
    lastUpdate  : new FormControl('' , [Validators.required  ] ),
    dateCreated : new FormControl('' , [Validators.required  ] )
  });  
  
  updatePro(updstu){     

    
    this.product=new Product();    
    
    this.product.id =  this.id.value;
    this.product.name = this.name.value;  
    this.product.description=this.description.value;  
    this.product.active =this.active;  
    this.product.sku =this.sku.value;  
    this.product.unitInStock =this.unitInStock.value;  
    this.product.unitPrice =this.unitPrice.value;  
    this.product.imageUrl =this.imageUrl.value;  
    this.product.lastUpdate  =this.lastUpdate;  
    this.product.dateCreated =this.dateCreated.value;  
    this.product.category=this.category;

   

 console.log(this.product);
     
  this.productService. createProduct(this.product).subscribe(  
   data => {       
     this.isupdated=true;  
     this.productService. getProductListPaginateforAdmin(this.thePageNumber-1,
       this.thePageSize)
       .subscribe(this.processResult());
   },  
    error => console.log(error));  
 }  
  

  get name(){  
    return this.productupdateform.get('name');  
  }  
  
  get description(){  
    return this.productupdateform.get('description');  
  } 
  get active(){  

    if(this.productupdateform.get('active').value == "")
    {
      return true;
    }else{
      return this.productupdateform.get('active').value; 
    }
  } 

  get sku(){  
    return this.productupdateform.get('sku');  
  } 
  get unitInStock(){  
    return this.productupdateform.get('unitInStock');  
  } 
  get imageUrl(){  
    return this.productupdateform.get('imageUrl');  
  } 
  get lastUpdate(){  
    return new Date();  
  } 
  get unitPrice(){  
    return this.productupdateform.get('unitPrice');  
  } 
  get dateCreated(){  
   
    return this.productupdateform.get('dateCreated');  
  } 
  get category(){  

    if(this.productupdateform.get('category').value == "")
    {
      return this.Pcategory
    }else{
      return this.productupdateform.get('category').value; 
    }

     
  } 
 
  get id(){  
    return this.productupdateform.get('id');  
  }  
  
  changeisUpdate(){  
    this.isupdated=false;  
  }  
}  
