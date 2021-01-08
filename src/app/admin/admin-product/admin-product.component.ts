import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product.model';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  // categories: Array<ICategory> = [];
  // currentCategory: ICategory;
  // adminCategories: Array<ICategory> = [];
  // categoryName: string;
  // productCategory: string;
  adminProd: Array<IProduct> = [];
  prodID: string;
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

  // private getCategories(): void {
  //   this.catService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     this.categories = data;
  //   });
  // }

  // setCategory(): void {
  //   this.currentCategory = this.adminCategories.filter(category =>
  //     category.name === this.productCategory)[0];
  //   console.log(this.currentCategory.name.toLowerCase());
  //   // this.checkCategory();
  // }

  getAdminProducts(): void {
    this.prodService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminProd = data;
    });
  }


  addAdminProduct(): void {
    const newP = new Product(1, this.prodName, this.description, this.weight, this.price, this.prodImage);
    delete newP.id;
    this.prodService.create(newP).then(() => {
      console.log('Created new item successfully!');
    })
    this.resetForm();
  }

  editAdminProduct(product: IProduct): void {
    this.prodID = product.id.toString();
    this.prodName = product.name;
    this.description = product.description;
    this.weight = product.weight;
    this.price = product.price;
    this.prodImage = product.image;
    this.editStatus = true;
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

  updateAdminProduct(): void {
    const currentProd = new Product(this.prodID, this.prodName, this.description, this.weight, this.price, this.prodImage);
    // delete currentProd.id;
    this.prodService.update(currentProd.id.toString(), currentProd)
      .then(() => console.log('The product was updated successfully!'))
        .catch(err => console.log(err));
    this.resetForm();
    this.editStatus = false;
  }

  deleteAdminProduct(product: IProduct): void {
    this.prodService.delete(product.id.toString())
    .then(() => console.log('The product was delete successfully!'))
      .catch(err => console.log(err));
  }

  scrollToEdit(): void {
    document.getElementById('editForm').scrollIntoView({ behavior: "smooth" });
  }

}
