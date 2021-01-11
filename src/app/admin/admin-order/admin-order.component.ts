import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/shared/classes/order.model';
import { IFeedback } from 'src/app/shared/interfaces/feedback.interface';
import { IForm } from 'src/app/shared/interfaces/form.interface';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { FormService } from 'src/app/shared/services/form.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  orders: Array<IOrder> = [];
  products: Array<IProduct> = [];
  forms: Array<IForm> = [];

  constructor(private orderService: OrderService,
              private prodService: ProductsService,
              private formService: FormService) {
  }
  ngOnInit(): void {
    this.getOrders();
    this.getProducts();
    this.getForm()
  }

  getProducts(): void {
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

  getOrders(): void {
    this.orderService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.orders = data;
    });
  }

  deleteAdminOrder(product: IProduct): void {
    this.orderService.delete(product.id.toString())
      .then(() => console.log('The product was delete successfully!'))
      .catch(err => console.log(err));
  }

  getForm(): void {
    this.formService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.forms = data;
    });
  }

  deleteForm(form: IProduct): void {
    this.formService.delete(form.id.toString())
      .then(() => console.log('The form was delete successfully!'))
      .catch(err => console.log(err));
  }


}
