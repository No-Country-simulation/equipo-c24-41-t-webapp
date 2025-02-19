import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  cartService = inject(CartService);

  products = [
    { name: 'Pan casero', price: 500 },
    { name: 'Tortitas', price: 300 },
  ];

  addToCart(product: { name: string; price: number }) {
    this.cartService.add(product);
  }
}
