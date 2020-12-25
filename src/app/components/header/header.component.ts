import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  active: boolean = false;
  basket: Array<IProduct> = [];
  totalPrice = 0;

  constructor(private modalService: BsModalService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.toggle();
    this.getLocalProducts();
    this.checkBasket();
  }

  openBasket(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }


  toggle(): void {
    this.active = !this.active;
  }

  private checkBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.basket = data;
        this.totalPrice = this.getTotal(this.basket);
        
      }
    )
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
