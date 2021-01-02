import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/classes/order.model';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IProfile } from 'src/app/shared/interfaces/profile.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Array<IProduct> = [];
  userName: string;
  userTel: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  userFlat: string;
  userComments: string;
  totalPayment: string;
  // prod: IProduct;
  totalPrice = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.checkBasket();
  }

  private checkBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.getLocalProducts();
      }
    )
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')){
      this.orders = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.orders);
    }
    console.log(this.orders);
    
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  countProduct(product: IProduct, status: boolean): void {
    if (status) {
      product.count++
    }
    else {
      if (product.count > 1) {
        product.count--
      }
    }
    this.totalPrice = this.getTotal(this.orders);
    localStorage.setItem('basket', JSON.stringify(this.orders))
  }

  removeProduct(product: IProduct): void {
    const index = this.orders.findIndex(prod => prod.id === product.id);
    this.orders.splice(index, 1);
    this.totalPrice = this.getTotal(this.orders);
    localStorage.setItem('basket', JSON.stringify(this.orders))
  }

  addOrder(): void {
    const order = new Order(this.orders, this.userName, this.userTel, this.userCity, this.userStreet, 
    this.userHouse, this.userFlat, this.totalPrice, this.userComments);
    this.orderService.create(order).then(
      () => {
        this.orders = [];
        localStorage.removeItem('basket');
        this.orderService.basket.next();
      }
    )
  }

  checkUserLogin(): void {
    const user: IProfile = JSON.parse(localStorage.getItem('user'));
    this.userName = user.userName;
    this.userTel = user.phone;
    this.userCity = this.userCity;
    this.userStreet = this.userStreet;
    this.userHouse = this.userHouse;
  }

}
