import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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

  constructor(private prodService: ProductsService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.prodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.products = data;
    });
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
