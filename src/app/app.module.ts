import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';

import { CatalogComponent } from './pages/catalog/catalog.component';
import { BasketComponent } from './pages/basket/basket.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateComponent } from './pages/create/create.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SlickCarouselModule } from 'ngx-slick-carousel'; 

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ProfileComponent } from './pages/profile/profile.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CatalogComponent, 
    BasketComponent,
    NotFoundComponent,
    CreateComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent, 
    AdminComponent,
    AdminProductComponent,
    ProductDetailsComponent,
    ProfileComponent,
    AdminOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    HttpClientModule,
    SlickCarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
