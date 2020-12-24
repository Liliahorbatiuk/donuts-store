import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './pages/about/about.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component:  HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: ProductDetailsComponent },
  // { path: 'feedback', component:  },
  // { path: 'delivery', component:  },
  { path: 'create', component: CreateComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'product'},
    { path: 'product', component: AdminProductComponent },
  ]},
  { path: '**', component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
