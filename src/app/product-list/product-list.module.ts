import { Routes, RouterModule } from '@angular/router';
import { CartService } from './cart.service';
import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductlistComponent } from './productlist.component';


const routes: Routes = [
  {
    path: '',
    component: ProductlistComponent
  }
];

@NgModule({
  declarations: [ProductlistComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: [CartService]
})
export class ProductListModule { }
