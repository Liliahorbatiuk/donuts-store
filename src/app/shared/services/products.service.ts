import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // private products: Array<IProduct> = [
  //   {
  //     id: 1,
  //     name: 'Oreo',
  //     description: 'Орео –  шматочки печива орео, білий шоколад, дріжджове тісто.',
  //     price: 37,
  //     weight: '90',
  //     image: 'https://donutsbar.com.ua/wp-content/uploads/2019/07/oreo-35hrn-nachynka-bilyy-shokolad-vaha-100h-1.jpg',
  //     count: 1
  //   }
  // ]

  // private url: string;
  private dbPath = '/products';
  productsRef: AngularFirestoreCollection<IProduct> = null;

  constructor(private http: HttpClient,
              private db: AngularFirestore) { 
    // this.url = 'http://localhost:3000/products';
    this.productsRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IProduct> {
    return this.productsRef;
  }

  getLimitProduct(limit: number) {
    return this.db.collection(this.dbPath).ref.limit(limit);
  }

  create(product: IProduct): any {
    return this.productsRef.add({ ...product });
  }

  update(id: string, data: any): Promise<void> {
    return this.productsRef.doc(id).update({ ...data});
  }

  delete(id: string): Promise<void> {
    return this.productsRef.doc(id).delete();
  }

  getOneProduct(id: string): any {
    return this.productsRef.doc(id).get()

  }

}
