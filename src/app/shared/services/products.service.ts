import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  arrProd: Array<IProduct> = [
    {
      id: 1,
      name: 'Oreo',
      description: 'Орео –  шматочки печива орео, білий шоколад, дріжджове тісто.',
      weight: '90г',
      price: 37,
      image: 'https://donutsbar.com.ua/wp-content/uploads/2019/07/oreo-35hrn-nachynka-bilyy-shokolad-vaha-100h-1.jpg',
      count: 1
    }
  ]
  constructor() { }
}
