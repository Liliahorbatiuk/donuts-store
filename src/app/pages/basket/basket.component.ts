import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: Array<IProduct> = [];
  totalPrice = 0;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getLocalProducts();
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket);
    }
    console.log(this.basket);
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

}
