import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  prod: IProduct;
  constructor(private activatedRoute: ActivatedRoute,
              private prodService: ProductsService,
              public location: Location,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  private getProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');    
    this.prodService.getOneProduct(id).subscribe(
      data => {
        console.log(data.data());
        this.prod = data.data();
      },
      err => {
        console.log(err);
        
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
    product.count = 1;
  }

}
