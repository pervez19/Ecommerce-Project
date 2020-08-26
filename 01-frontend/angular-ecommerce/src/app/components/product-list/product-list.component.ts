import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from  'src/app/services/cart.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { timestamp } from 'rxjs/operators';
import { CartItem } from 'src/app/common/cart-item';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];
  currentCategoryId:number=1;
  previousCategoryId:number=1;
  previousKeyWord:string=null;
  searchMode:boolean=false;

  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;


  constructor(private productService: ProductService,
                    private cartService: CartService,
                    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {this.listProducts();});
  }
  listProducts()
  {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    console.log("keyword : "+this.searchMode);
    if(this.searchMode)
    {
      this.handleSearchProsucts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleListProducts()
  {
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId)
    {
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }
    else
    {
      this.currentCategoryId=1;
    }

    if(this.previousCategoryId!=this.currentCategoryId)
    {
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                              this.currentCategoryId)
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

 

  handleSearchProsucts()
  {
    const keyWord: string =this.route.snapshot.paramMap.get('keyword');

    if(this.previousKeyWord!=keyWord)
    {
      this.thePageNumber=1;
    }
    this.previousKeyWord=keyWord;

    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              keyWord)
                                              .subscribe(this.processResult());
  }


  updatePageSize(pageSize:number)
  {
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProducts();

  }

  addToChart(theProduct:Product)
  {
    const cartItem =new CartItem(theProduct);
    this.cartService.addToCart(cartItem);
  }
}
