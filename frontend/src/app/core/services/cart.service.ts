import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<{ name: string; price: number; quantity: number }[]>([]);

  add(product: { name: string; price: number }) {
    const index = this.cart().findIndex((p) => p.name === product.name);
    if (index !== -1) {
      this.cart.update((items) => {
        items[index].quantity++;
        return [...items];
      });
    } else {
      this.cart.update((items) => [...items, { ...product, quantity: 1 }]);
    }
  }

  remove(index: number) {
    this.cart.update((items) => items.filter((_, i) => i !== index));
  }

  clear() {
    this.cart.set([]);
  }
}
