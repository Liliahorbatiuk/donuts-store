import { Component, OnInit } from '@angular/core';
import AOS from "aos";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IFeedback } from 'src/app/shared/interfaces/feedback.interface';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<IProduct> = [];
  basket: Array<IProduct> = [];
  totalPrice = 0;
  feedback: Array<IFeedback> = [];
  userName: string;
  userPhone: string;

  constructor(private orderService: OrderService,
    private prodService: ProductsService,
    private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.getProduct();
    this.getFeedback();
    AOS.init();
  }

  getProduct(): void {
    this.prodService.getLimitProduct(3).get().then(docSnap => {
      docSnap.forEach(prod => {
        const data = prod.data() as IProduct;
        const id = prod.id;
        this.products.push({ id, ...data });
      })
    })
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
  }

  addToBasked(product: IProduct): void {
    console.log(product);
    this.orderService.addBasked(product);
    this.orderService.basket.next([product])
    product.count = 1;
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  getFeedback(): void {
    this.feedbackService.getLimitProduct(3).get().then(docSnap => {
      docSnap.forEach(feed => {
        const data = feed.data() as IFeedback;
        const id = feed.id;
        this.feedback.push({ id, ...data });
      })
    })
  }



}


