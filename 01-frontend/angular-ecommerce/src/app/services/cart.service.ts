import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cardItems: CartItem[]=[];

  totalPrice: Subject<Number>= new Subject<Number>();
  totalQuantity: Subject<Number>= new Subject<Number>();

  constructor() { }

  addToCart(theCardItem:CartItem)
  {
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:CartItem=undefined;

    if(this.cardItems.length>0)
    {
      
      existingCartItem=this.cardItems.find(tempCartItem => tempCartItem.id === theCardItem.id);

      alreadyExistsInCart=(existingCartItem!=undefined);
    }

    if(alreadyExistsInCart)
    {
      existingCartItem.quantity++;
    }
    else
    {
      this.cardItems.push(theCardItem);
    }


    this.computeCartTotals();

  }
  computeCartTotals() {
    
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;

    for(let currentCartItem of this.cardItems)
    {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue,totalQuantityValue);



  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    throw new Error("Method not implemented.");
  }
}
