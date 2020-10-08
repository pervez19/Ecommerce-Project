import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categorySaveform: FormGroup;

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  submitted = false; 


  productCategory : ProductCategory = new ProductCategory();
  constructor(private productService : ProductService) {}

  ngOnInit(): void {
    this.submitted = false;  
  this.categorySaveform=new FormGroup({  

    name :new FormControl('' , [Validators.required  ] ), 
  }) ; 
  }

  saveCategory(saveCategory){  

    
    if(this.categorySaveform.invalid)
    {
      this.categorySaveform.markAllAsTouched();
    }
   else{

      this. productCategory =new  ProductCategory ();     
      this.productCategory.categoryName=this.name.value;  
      this.submitted = true;  
      this.save(); 
    }
  }  

  save() {  
    console.log(this.productCategory);
   this.productService.createCategory (this.productCategory)  
     .subscribe(data => console.log(data), error => console.log(error));  
   this.productCategory = new ProductCategory();  
 } 




  get name(){  
    return this.categorySaveform.get('name');  
  }
  addCategoryForm(){  
    this.submitted=false;  
    this.categorySaveform.reset();  
  } 

}
