import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  basket: Array<IProduct>;
  name: IProfile;
  userName = '';
  userTel: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  userFlat: string = '';
  userComments: string = '';
  box: boolean = false;
  totalPayment: string;
  prod: IProduct;
  totalPrice = 0;
  modalRef: BsModalRef;

  isInvalid = false;

  constructor(private orderService: OrderService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getLocalProducts();
    this.checkBasket();
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket);
    }
  }

  private checkBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.getLocalProducts();
      }
    )
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  countProduct(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.totalPrice = this.getTotal(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket))
    this.orderService.basket.next([product])

  }

  removeProduct(product: IProduct): void {
    const index = this.basket.findIndex(prod => prod.id === product.id);
    this.basket.splice(index, 1);
    this.totalPrice = this.getTotal(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket))
  }

  addOrder(): void {
    if (this.userName && this.userTel && this.userCity && this.userStreet && this.userHouse && this.totalPrice > 100) {
      const order = new Order(this.basket, this.userName, this.userTel, this.userCity, this.userStreet,
        this.userHouse, this.totalPrice, this.userFlat, this.userComments, this.box);
      console.log(this.userName);
      this.orderService.create(order).then(
        () => {
          this.basket = [];
          localStorage.removeItem('basket');
          this.orderService.basket.next();
        }
      )
      this.totalPrice = 0;
      this.resetForm();
    }

  }



  checkUserLogin(): void {
    const user: IProfile = JSON.parse(localStorage.getItem('user'));
    this.userName = user.userName;
    this.userTel = user.phone;
    this.userCity = this.userCity;
    this.userStreet = this.userStreet;
    this.userHouse = this.userHouse;
  }

  private resetForm(): void {
    this.userName = '';
    this.userTel = '';
    this.userCity = '';
    this.userStreet = '';
    this.userHouse = '';
    this.userFlat = '';
    this.userComments = '';
    this.box = false;
  }

  openOrderModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

}
