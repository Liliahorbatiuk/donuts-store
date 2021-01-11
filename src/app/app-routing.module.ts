import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminFeedbackComponent } from './admin/admin-feedback/admin-feedback.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminComponent } from './admin/admin.component';
import { AuthAdminComponent } from './auth-admin/auth-admin.component';
import { AboutComponent } from './pages/about/about.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ProfileGuard } from './shared/guards/profile.guard';
import { AuthAdminService } from './shared/services/auth-admin.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component:  HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: ProductDetailsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'admin-login', component: AuthAdminComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ AdminGuard ], children: [
    { path: '', pathMatch: 'full', redirectTo: 'product'},
    { path: 'product', component: AdminProductComponent },
    { path: 'category', component: AdminCategoryComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: 'feedback', component: AdminFeedbackComponent },

  ]},
  { path: '**', redirectTo: '404' }, 
  { path: '404', component: NotFoundComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
