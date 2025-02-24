import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Estado interno del carrito (Actualmente solo maneja datos locales, Se debería sincronizarse con la API)
  private cartItems: CartItem[] = [];

  // BehaviorSubject para emitir cambios en el carrito (Debería inicializarse con los datos del backend)
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

    // Método para obtener el total de items
    getTotalItems(): number {
      return this.cartItems.reduce(
        (total: number, item: CartItem) => total + item.cantidad, 
        0
      );
    }

  // Método para agregar un producto al carrito
  addProduct(product: Product, quantity: number = 1): void {
  const updatedCart = [...this.cartItems];
  
  const existingItem = updatedCart.find(item => item.producto.id === product.id);
    
  if (existingItem) {
    existingItem.cantidad += quantity;
    existingItem.total = existingItem.cantidad * product.precio;
  } else {
    updatedCart.push({
      producto: product,
      cantidad: quantity,
      total: product.precio * quantity
    });
  }
  
  this.cartItems = updatedCart; // Actualizar array interno
  this.cartItemsSubject.next(this.cartItems); // Notificar cambios
}

  // Método para actualizar la cantidad de un producto en el carrito
  updateQuantity(productId: number, cantidad: number): void {
    const index = this.cartItems.findIndex(item => item.producto.id === productId);
    if (index > -1 && cantidad > 0) {
      this.cartItems[index].cantidad = cantidad;
      this.cartItems[index].total = this.cartItems[index].cantidad * this.cartItems[index].producto.precio;
      this.cartItemsSubject.next(this.cartItems);

      // Aca se debe hacer una llamada a la API para actualizar la cantidad en el backend
    }
  }

  // Método para eliminar un producto del carrito
  removeProduct(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.producto.id !== productId);
    this.cartItemsSubject.next(this.cartItems);

    // Aca se debe hacer la solicitud a la API para eliminar el producto del carrito en el backend
  }

  // Método para calcular el total del carrito (Este cálculo puede hacerse localmente, pero después podría obtenerse de la API)
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.total, 0);
  }

  // Método para vaciar el carrito
  clearCart(): void {
    this.cartItems = []; // Limpiar array interno
    this.cartItemsSubject.next(this.cartItems); // Notificar cambios
  }
}
