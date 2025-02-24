import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { FavService } from '../../services/fav.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  // Lista de productos (puede ser estática o provenir de un servicio)
  products: Product[] = [];

  // Emisor para notificar que se agregó un producto
  @Output() agregarProducto = new EventEmitter<Product>();
  favorites: Product[] = [];

  constructor(
    private authService: AuthService,
    private favService: FavService,
    private productService: ProductService
  ) {
    this.favService.favsItems$.subscribe((favs) => {
      this.favorites = favs;
    });
  }

  // products.component.ts
  ngOnInit() {
    this.productService.dynamicProductsPublic$.subscribe(() => {
      this.products = this.productService.getAllProducts(); // 👈 Actualiza la lista
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
    return this.favorites.some((fav) => fav.id === product.id);
  }
getVendedorName(vendedorId?: number): string {
  if (!vendedorId) return 'Anónimo';
  
  const vendedor = this.authService.getUserById(vendedorId);
  return vendedor?.businessName || vendedor?.name || 'Vendedor no registrado';
}
}
