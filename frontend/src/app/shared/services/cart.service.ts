import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject para manejar el estado del carrito
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Método para obtener el total de items
  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.cantidad, 
      0
    );
  }

  // Método para agregar un producto al carrito
  addProduct(product: Product): void {
    const currentItems = [...this.cartItemsSubject.value];
    const existingItemIndex = currentItems.findIndex(item => item.producto.id === product.id);

    if (existingItemIndex > -1) {
      // Crear nuevo objeto para mantener inmutabilidad
      const existingItem = currentItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        cantidad: existingItem.cantidad + 1,
        total: (existingItem.cantidad + 1) * product.precio
      };
      currentItems[existingItemIndex] = updatedItem;
    } else {
      currentItems.push({
        producto: product,
        cantidad: 1,
        total: product.precio
      });
    }

    this.cartItemsSubject.next(currentItems);
  }

  // Método para actualizar la cantidad de un producto
  updateQuantity(productId: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.removeProduct(productId);
      return;
    }

    const items = [...this.cartItemsSubject.value];
    const index = items.findIndex(item => item.producto.id === productId);
    
    if (index > -1) {
      const updatedItem = {
        ...items[index],
        cantidad: cantidad,
        total: cantidad * items[index].producto.precio
      };
      items[index] = updatedItem;
      this.cartItemsSubject.next(items);
    }
  }

  // Método para eliminar un producto del carrito
  removeProduct(productId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(
      item => item.producto.id !== productId
    );
    this.cartItemsSubject.next(updatedItems);
  }

  // Método para calcular el total del carrito
  getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.total, 0);
  }

  // Método para vaciar el carrito
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}