import { ProductListModule } from './product-list/product-list.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'products', loadChildren: 'src/app/product-list/product-list.module#ProductListModule'},
{path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
