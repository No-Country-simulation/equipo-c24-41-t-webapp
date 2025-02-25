import {
  ViewChild,
  ElementRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { FavService } from '../../services/fav.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../services/cart.service';
CartService

declare const window: any;

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  // Lista de productos (puede ser estática o provenir de un servicio)
  favorites: Product[] = [];
  @Input() products: Product[] = [];
  allProducts: Product[] = [];

  selectedProduct: Product | null = null;
  selectedProductId: number | null = null;
  selectedQuantity: number = 1;

  // Emisor para notificar que se agregó un producto

@ViewChild('productDetailsCanvas') productDetailsCanvas!: ElementRef;

  constructor(
    private authService: AuthService,
    private favService: FavService,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.allProducts = this.productService.getAllProducts();
    this.favService.favsItems$.subscribe((favs) => {
      this.favorites = favs;
    });
  }

  ngOnInit() {
    this.productService.dynamicProductsPublic$.subscribe(() => {
      this.products = this.productService.getAllProducts(); 
      this.allProducts = this.productService.getAllProducts();
    });
  }

  // Agregar al carrito


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
  showProductDetails(product: Product): void {
    this.selectedProduct = product;

    // Usar inicialización directa con el elemento de ViewChild
    const offcanvas = new window.bootstrap.Offcanvas(
      this.productDetailsCanvas.nativeElement
    );
    offcanvas.show();
  }

  // Método para mostrar el selector de cantidad
  showQuantitySelector(productId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedProductId = productId;
    this.selectedQuantity = 1;
  }

  // Ajustar cantidad
  adjustQuantity(amount: number): void {
    this.selectedQuantity = Math.max(1, this.selectedQuantity + amount);
  }

  // Confirmar adición al carrito
confirmAddToCart(product: Product): void {
  if (this.selectedQuantity > 0) {
    // Obtener el producto COMPLETO del servicio
    const fullProduct = this.productService.getProductById(product.id);
    
    if (fullProduct) {
      for (let i = 0; i < this.selectedQuantity; i++) {
        this.cartService.addProduct(fullProduct); 
      }
    }
    this.selectedProductId = null;
  }
}
  cancelSelection(): void {
    this.selectedProductId = null;
    this.selectedQuantity = 1;
  }

  // Método para cerrar el offcanvas
  closeDetails(): void {
    this.selectedProduct = null;
  }
}
