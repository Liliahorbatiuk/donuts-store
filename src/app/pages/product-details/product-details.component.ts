import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
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
              public location: Location) { }

  ngOnInit(): void {
    this.getProduct()
  }

  private getProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');    
    this.prodService.getOneProduct(id).subscribe(
      data => {
        this.prod = data;
      },
      err => {
        console.log(err);
        
      }
    )
  }

}
