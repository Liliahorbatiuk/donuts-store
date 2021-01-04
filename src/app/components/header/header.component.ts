import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  active: boolean = false;
  basket: Array<IProduct>;
  prod: IProduct;
  totalPrice = 0;
  userName: string;
  userEmail: string;
  userTel: string;
  userPass: string;
  isLogin = false;

  constructor(private modalService: BsModalService,
              private orderService: OrderService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.toggle();
    this.getLocalProducts();
    this.checkBasket();
    this.checkLocalUser();
    this.checkUserLogin();
  }

  openBasket(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }


  toggle(): void {
    this.active = !this.active;
  }

  private checkBasket(): void {
    this.orderService.basket.subscribe(
      data => {
        this.getLocalProducts();
      }
    )
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket'));
      this.totalPrice = this.getTotal(this.basket);
    }
    console.log(this.basket);
    
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  countProduct(product: IProduct, status: boolean): void {
    if (status) {
      product.count++
    }
    else {
      if (product.count > 1) {
        product.count--
      }
    }
    this.totalPrice = this.getTotal(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket))
  }

  removeProduct(product: IProduct): void {
    const index = this.basket.findIndex(prod => prod.id === product.id);
    this.basket.splice(index, 1);
    this.totalPrice = this.getTotal(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket))
  }

  openProfile(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  signUp(): void {
    if (this.userEmail && this.userPass) {
      this.authService.signUp(this.userEmail, this.userPass);
    };
    this.resetForm()
  }

  signIn(): void {
    if (this.userEmail && this.userPass) {
      this.authService.signIn(this.userEmail, this.userPass);
    }
    this.resetForm()
  }

  signOut(): void {
    if (localStorage.getItem('user')) {
      this.authService.signOut();
    }
  }

  private checkLocalUser(): void {
    if (localStorage.getItem('user')){
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
      
    }
  }

  private checkUserLogin(): void {
    this.authService.checkSignIn.subscribe(() => {
      this.checkLocalUser();
    })
  }

  signUpModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  scrollToAdv(): void {
    document.getElementById('advantages').scrollIntoView({ behavior: "smooth" });
  }

  scrollToDel(): void {
    document.getElementById('delivery').scrollIntoView({ behavior: "smooth" });
  }
  
  scrollToFeed(): void {
    document.getElementById('feedback').scrollIntoView({ behavior: "smooth" });
  }

  private resetForm(): void {
    this.userName = '';
    this.userEmail = '';
    this.userTel = '';
    this.userPass = ''
  }
}
