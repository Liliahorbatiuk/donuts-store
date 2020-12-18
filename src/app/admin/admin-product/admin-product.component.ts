import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  adminProd: Array<IProduct> = [];
  prodName: string;
  description: string;
  price: number;
  weight: string;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.getAdminProducts();
  }

  getAdminProducts(): void {
    this.adminProd = this.prodService.arrProd
  }

}
