import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit {
  products: Array<IProduct> = [];

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.prodService.getProducts()
  }

  

}
