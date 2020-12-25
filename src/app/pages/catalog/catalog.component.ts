import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit {
  products: Array<IProduct> = []; 
  addProdStatus = false;

  constructor(private prodService: ProductsService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.prodService.getProducts().subscribe(
      data => {
        this.products = data;
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
    this.addProdStatus = true;

  }

  

}
