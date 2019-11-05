import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    selectedProducts$: Subject<Array<any>>;
    selectedProducts: Array<any>;
    productQtyMap: Map<string, number>;
    productQtyMap$: Subject<Map<string, number>>;

    constructor() {
        this.selectedProducts$ = new Subject<Array<any>>();
        this.selectedProducts = new Array<any>();
        this.productQtyMap = new Map<string, number>();
        this.productQtyMap$ = new Subject<Map<string, number>>();
    }

    getQty(productId: string): number {
        return this.productQtyMap.get(productId);
      }

    updateQty(productid: string, qty: number) {
        this.productQtyMap.set(productid, qty);
        this.productQtyMap$.next(this.productQtyMap);
    }

    updateProduct(product: any, type: string) {
        if(type === 'add') {
            const itemIndex = this.selectedProducts.findIndex(prod => prod['id'] === product['id']);
            if( itemIndex === -1 ) {
                this.selectedProducts.push(product);
            }
        } else {
            const itemIndex = this.selectedProducts.findIndex(prod => prod['id'] === product['id']);
            if(this.getQty(product['id']) === 0) {
                this.selectedProducts.splice(itemIndex, 1);
            }
        }
        this.selectedProducts$.next(this.selectedProducts);
    }


}