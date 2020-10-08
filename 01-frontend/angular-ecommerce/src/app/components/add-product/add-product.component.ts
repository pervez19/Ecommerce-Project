import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productsaveform: FormGroup;


  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  





  productCategory: ProductCategory[];
  constructor(private productService : ProductService) { }

  product : Product = new Product();
  submitted = false;  

  ngOnInit(): void {
    this.submitted = false;  
    this.listProductCategory();

     this.productsaveform=new FormGroup({  

      name :new FormControl('' , [Validators.required  ] ), 
      description :new FormControl('',[Validators.required ] ), 
      active :new FormControl('' , [Validators.required  ] ), 
      sku  :new FormControl('' , [Validators.required  ] ), 
      unitInStock  :new FormControl('' ,[Validators.required  ] ), 
      unitPrice :new FormControl('' ,[Validators.required  ] ), 
     
      category : new FormControl('' ,[Validators.required  ] )
    });  
  }




  // onSubmit() {
  //   this.productService.createProduct(this.form).subscribe(
  //     data => {
  //       console.log(data);
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isSignUpFailed = true;
  //     }
  //   );
  // }










  listProductCategory() {
    this.productService.getProductCategory().subscribe(
      data =>{
        this.productCategory=data;
      }
    );
  }


 
  
  saveProduct(saveProduct){  

    console.log(this.productsaveform.invalid);
    console.log(this.productsaveform);
    if(this.productsaveform.invalid)
    {
      this.productsaveform.markAllAsTouched();
    }
   else{

      console.log("valid")

      this.product=new Product();     
      this.product.name =this.name.value;  
      this.product.description=this.description.value;  
      this.product.active =this.active.value;  
      this.product.sku =this.sku.value;  
      this.product.unitInStock =this.unitInStock.value;  
      this.product.unitPrice =this.unitPrice.value;  
      this.product.imageUrl =this.imageUrl;  
      this.product.lastUpdate  =this.lastUpdate;  
      this.product.dateCreated =this.dateCreated;  
      this.product.category=this.category.value;
  
      this.submitted = true;  
  
      this.save(); 
    }
  }  
  
  
  
  save() {  
     console.log(this.product);
    this.productService.createProduct (this.product)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.product = new Product();  
  }  
 
  

  get name(){  
    return this. productsaveform.get('name');  
  }  
  
  get description(){  
    return this. productsaveform.get('description');  
  } 
  get active(){  
    return this. productsaveform.get('active');  
  } 
  get sku(){  
    return this. productsaveform.get('sku');  
  } 
  get unitInStock(){  
    return this. productsaveform.get('unitInStock');  
  } 
  get imageUrl(){  
    return " ";  
  } 
  get lastUpdate(){  
    return new Date();  
  } 
  get unitPrice(){  
    return this. productsaveform.get('unitPrice');  
  } 
  get dateCreated(){  
    return  new Date();  
  } 
  get category(){  
    return this. productsaveform.get('category');  
  } 

  addProductForm(){  
    this.submitted=false;  
    this.productsaveform.reset();  
  }  
}  
