import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  categoryData : any;
  deleteMessage=false;  
  productCategorys: ProductCategory[];
  constructor(private modalService: BsModalService,private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategory()
  }

  listProductCategory() {
    this.productService.getProductCategory().subscribe(
      data =>{
        this.productCategorys=data;
      }
    );
  }

  openModal(template: TemplateRef<any>, data) {
    this.categoryData = data
    this.modalRef = this.modalService.show(template,  this.categoryData);
  }

  deleteCategory(id: number) {  
    this.productService.deleteCategory(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.productService.getProductCategory().subscribe(
            data =>{
              this.productCategorys=data;
            }
          );
        },  
        error => console.log(error));  
  }  
}
