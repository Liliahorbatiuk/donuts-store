import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.model';
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
  prodImage: string;
  editStatus = false;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.getAdminProducts();
  }

  getAdminProducts(): void {
    this.prodService.getProducts().subscribe(
      data => {
        this.adminProd = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  addAdminProduct(): void {
    const newP = new Product(1, this.prodName, this.description, this.weight, this.price, this.prodImage);
    this.prodService.postProduct(newP).subscribe(() => {
      this.getAdminProducts()
    })
    delete newP.id;
    this.resetForm();
  }

  deleteAdminProduct(product: IProduct): void {
    this.prodService.deleteProduct(product).subscribe(() => {
      this.getAdminProducts();
    })
  }

  private resetForm(): void {
    this.prodName = '';
    this.description = '';
    this.weight = '';
    this.price = null; 
  }

}
