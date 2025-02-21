import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Estado interno del carrito
  private cartItems: CartItem[] = [];
  // BehaviorSubject para emitir cambios en el carrito
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Método para agregar un producto al carrito
  addProduct(product: Product): void {
    const index = this.cartItems.findIndex(item => item.producto.id === product.id);
    if (index > -1) {
      // El producto ya existe; incrementar cantidad y actualizar total
      this.cartItems[index].cantidad += 1;
      this.cartItems[index].total = this.cartItems[index].cantidad * product.precio;
    } else {
      // Agregar nuevo producto con cantidad inicial de 1
      this.cartItems.push({
        producto: product,
        cantidad: 1,
        total: product.precio
      });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  // Método para actualizar la cantidad de un producto en el carrito
  updateQuantity(productId: number, cantidad: number): void {
    const index = this.cartItems.findIndex(item => item.producto.id === productId);
    if (index > -1 && cantidad > 0) {
      this.cartItems[index].cantidad = cantidad;
      this.cartItems[index].total = this.cartItems[index].cantidad * this.cartItems[index].producto.precio;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  // Método para eliminar un producto del carrito
  removeProduct(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.producto.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  // Método para calcular el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.total, 0);
  }
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
  
}
