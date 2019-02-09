import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductService} from './services/product.service';
import { TwitterService} from './services/twitter.service';
import { GlobalService} from './services/global.service';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ListTweetsComponent } from './components/list-tweets/list-tweets.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ErrorComponent,
    ProductEditComponent,
    ListTweetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ProductService,
    TwitterService,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
