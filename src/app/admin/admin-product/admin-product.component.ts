import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.model';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

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

  uploadPercent: Observable<number>;

  constructor(private prodService: ProductsService,
              private storage: AngularFireStorage) { }

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
    // console.log(newP);
    delete newP.id;
    this.prodService.postProduct(newP).subscribe(() => {
      this.getAdminProducts()
    })
    this.resetForm();
  }

  deleteAdminProduct(product: IProduct): void {
    this.prodService.deleteProduct(product).subscribe(() => {
      this.getAdminProducts();
    })
  }

  editAdminProduct(product: IProduct): void {
    this.prodName = product.name;
    this.description = product.description;
    this.weight = product.weight;
    this.price = product.price;
    this.editStatus = true;
  }

  saveAdminProduct(): void {
    const updP = new Product(1, this.prodName, this.description, this.weight, this.price, this.prodImage);
    this.prodService.updateProduct(updP).subscribe(() => {
      this.getAdminProducts()
    })
    this.resetForm();
    this.editStatus = false;
  }

  private resetForm(): void {
    this.prodName = '';
    this.description = '';
    this.weight = '';
    this.price = null; 
    this.prodImage = null;
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    console.log(file, filePath);
    const ref = this.storage.ref(filePath);
    const task = ref.put(file); 
    this.uploadPercent = task.percentageChanges();
    task.then(image => { 
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.prodImage = url;
        console.log(this.prodImage); 
      });
    }); 
  }

}
