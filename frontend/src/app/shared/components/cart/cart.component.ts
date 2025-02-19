import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);
  cart = this.cartService.cart;  // Usamos el signal del servicio
  isOpen = false;

  // Toggle para abrir y cerrar el carrito
  toggleCart() {
    this.isOpen = !this.isOpen;
  }

  // Método para eliminar un producto del carrito
  remove(index: number) {
    this.cartService.remove(index);
  }
}
