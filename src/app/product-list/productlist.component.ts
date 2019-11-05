import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CartService } from './cart.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
productlist: any;
fName: string;
emailId: string;
phone: string;
checkedOutProd: any = [];
cartProducts: Array<any>;
count: number;
productQtyMap: Map<string, number>;
url: string;

  constructor(private http: HttpClient, private cartSrv: CartService) {
    this.url = 'https://gist.githubusercontent.com/sandeepdillerao/edb372a95d6cf1a2a49b79577d023281/raw/24906c5560f4747b8363c138e33efd1a99093ba5/product.json';
    
    this.productQtyMap = new Map<string, number>();
  }

  ngOnInit() {
    this.cartSrv.selectedProducts$.subscribe(prodList => this.cartProducts = prodList);
    this.cartSrv.productQtyMap$.subscribe( map => this.productQtyMap = map);
    this.count = 0;
     this.http.get(this.url).subscribe(data => {
        this.productlist = data;
        this.productlist.forEach(obj => {
          this.cartSrv.updateQty(obj['id'],0);
          /* if(obj.description == ''){
            obj.description=0;
          } */
        });
     });
  }

  getQty(productId: string): number {
    return this.productQtyMap.get(productId);
  }

  itmCount(type: string, product: any) {
    switch(type) {
      case 'add': {
        this.cartSrv.updateQty(product['id'], this.productQtyMap.get(product['id'])+1);
        break;
      }
      case 'delete': {
        if(this.productQtyMap.get(product['id']) > 0) {
          this.cartSrv.updateQty(product['id'], this.productQtyMap.get(product['id'])-1)
        }
        break;
      }
    }
    this.cartSrv.updateProduct(product, type);
  }

  onSubmit() {
    this.checkedOutProd.push({Name: this.fName, Email: this.emailId, Phone: this.phone});
    this.checkedOutProd.push(this.cartProducts);
    console.log(this.checkedOutProd);
  }

}
