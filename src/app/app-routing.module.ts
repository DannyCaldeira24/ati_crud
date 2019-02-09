import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ListTweetsComponent } from './components/list-tweets/list-tweets.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'product-list', component:ProductListComponent},
  {path:'product-add', component: ProductAddComponent},
  {path:'product-detail/:id', component: ProductDetailComponent},
  {path:'product-edit/:id', component: ProductEditComponent},
  {path:'tweets', component: ListTweetsComponent},
  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
