import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from  'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product= new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    }
    );
  }

  handleProductDetails() {
     const theProductid: number =+this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(theProductid).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToChart(theProduct:Product)
  {
    const cartItem =new CartItem(theProduct);
    this.cartService.addToCart(cartItem);
  }
}
