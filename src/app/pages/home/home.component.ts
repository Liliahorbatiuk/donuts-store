import { Component, OnInit } from '@angular/core';
import AOS from "aos";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
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
  constructor(private orderService: OrderService, private prodService: ProductsService) { }

  ngOnInit(): void {
    this.getProduct();
    AOS.init();
  }

  getProduct(): void {
    this.prodService.getCountProduct(0,3).subscribe(
      data => {
        this.products = data;
      }
    )
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


  // slides = [
  //   { 
  //     name: 'Iryna',
  //     date: new Date(),
  //     grade: '★★★★',
  //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nulla?'
  //   },
  // ];
  // slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};

  // addSlide() {
  //   this.slides.push()
  // }
  
  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }
  
  // slickInit(e) {
  //   console.log('slick initialized');
  // }
  
  // breakpoint(e) {
  //   console.log('breakpoint');
  // }
  
  // afterChange(e) {
  //   console.log('afterChange');
  // }
  
  // beforeChange(e) {
  //   console.log('beforeChange');
  // }
}


