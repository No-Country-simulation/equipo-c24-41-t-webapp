import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { FavService } from '../../services/fav.service';



@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    // Lista de productos (puede ser estática o provenir de un servicio)
    products: Product[] = [
      { id: 1, nombre: 'Producto A', precio: 100, descripcion: 'Descripción A' },
      { id: 2, nombre: 'Producto B', precio: 150, descripcion: 'Descripción B' },
      // Más productos...
    ];

      // Emisor para notificar que se agregó un producto
  @Output() agregarProducto = new EventEmitter<Product>();
  favorites: Product[] = [];

  constructor(private favService: FavService) {
    this.favService.favsItems$.subscribe(favs => {
      this.favorites = favs;
    });
  }
  // Agregar al carrito
  onAgregar(product: Product): void {
    console.log('Producto agregado al carrito:', product);
    this.agregarProducto.emit(product);
  }

  // Toggle para agregar/quitar de favoritos
  onToggleFav(product: Product): void {
    this.favService.toggleFav(product);
  }

  // Verifica si el producto ya está en favoritos
  isFavorite(product: Product): boolean {
    return this.favorites.some(fav => fav.id === product.id);
  }
  
}



