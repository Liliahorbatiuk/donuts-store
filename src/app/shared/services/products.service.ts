import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Array<IProduct> = [
    {
      id: 1,
      name: 'Oreo',
      description: 'Орео –  шматочки печива орео, білий шоколад, дріжджове тісто.',
      price: 37,
      weight: '90',
      image: 'https://donutsbar.com.ua/wp-content/uploads/2019/07/oreo-35hrn-nachynka-bilyy-shokolad-vaha-100h-1.jpg',
      count: 1
    }
  ]

  private url: string;
  private dbPath = '/products';
  productsRef: AngularFirestoreCollection<IProduct> = null;

  constructor(private http: HttpClient,
              private db: AngularFirestore) { 
    this.url = 'http://localhost:3000/products';
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

  

  // getProduct(): Array<IProduct> {
  //   return this.arrProd;
  // }

  // setProduct(newP: IProduct): void {
  //   this.arrProd.push(newP);
  // }

  // getProducts(): Observable<Array<IProduct>> {
  //   return this.http.get<Array<IProduct>>(this.url);
  // } 

  // postProduct(product: IProduct): Observable<IProduct> {
  //   console.log(product );
  //   return this.http.post<IProduct>(this.url, product);
  // }

  // updateProduct(product: IProduct): Observable<IProduct> {
  //   return this.http.put<IProduct>(`${this.url}/${product.id}`, product)
  // }

  // deleteProduct(product: IProduct): Observable<IProduct> {
  //   return this.http.delete<IProduct>(`${this.url}/${product.id}`)
  // }

  // getOneProduct(id: number | string): Observable<IProduct> {
  //   return this.http.get<IProduct>(`${this.url}/${id}`);
  // }

  // getCountProduct(start: number, end: number): Observable<Array<IProduct>> {
  //   return this.http.get<Array<IProduct>>(`${this.url}?_start=${start}&_end=${end}`);
  // }

}
