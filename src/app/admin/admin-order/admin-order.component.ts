import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/shared/classes/order.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  orders: Array<IOrder> = [];
  products: Array<IProduct>;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
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


}
