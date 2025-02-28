import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../../shared/components/products/products.component';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { FavService } from '../../shared/services/fav.service';
import { CartService } from '../../shared/services/cart.service';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css',
})
export class ResearchComponent {
  searchQuery: string = '';
  products: Product[] = [];
<<<<<<< HEAD
  filteredProducts: Product[] = [];
=======
>>>>>>> cce4eba (Actualizar componente de research; agregar lógica para manejar productos favoritos, selección de cantidad y detalles del producto, y optimizar la visualización de productos.)
  favorites: Product[] = [];
  isAuthenticated: boolean = false;
  maxStock: number = 1;
  selectedProductId: number | null = null;
  selectedQuantity: number = 1;
  selectedProduct: Product | null = null;
  vendedorNames: { [key: number]: string } = {};

  constructor(
    private authService: AuthService,
    private favService: FavService,
    private productService: ProductService,
<<<<<<< HEAD
    private cartService: CartService, 
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.products = this.productService.getAllProducts();
    this.favService.favsItems$.subscribe((favs) => (this.favorites = favs));
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

=======
    private cartService: CartService
  ) {
    this.products = this.productService.getAllProducts();
    this.favService.favsItems$.subscribe((favs) => (this.favorites = favs));
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

>>>>>>> cce4eba (Actualizar componente de research; agregar lógica para manejar productos favoritos, selección de cantidad y detalles del producto, y optimizar la visualización de productos.)
    this.products.forEach((product) => {
      if (product.vendedorId) {
        const vendedor = this.authService.getUserById(product.vendedorId);
        this.vendedorNames[product.vendedorId] =
          vendedor?.businessName || vendedor?.name || 'Anónimo';
      }
    });
  }
<<<<<<< HEAD
  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate([], { 
        relativeTo: this.route,
        queryParams: { query: this.searchQuery.trim() },
        queryParamsHandling: 'merge' // Mantener otros parámetros si existen
      });
    }
  }

  ngOnInit() {
    // Obtener productos
    this.products = this.productService.getAllProducts();
    this.filteredProducts = this.products;

    // Escuchar cambios en los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.filterProducts();
    });
  }
    // Filtrar productos según el término de búsqueda
    private filterProducts(): void {
      if (!this.searchQuery) {
        this.filteredProducts = this.products;
        return;
      }
  
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product => 
        product.nombre.toLowerCase().includes(query) || 
        product.descripcion?.toLowerCase().includes(query)
      );
    }
=======
>>>>>>> cce4eba (Actualizar componente de research; agregar lógica para manejar productos favoritos, selección de cantidad y detalles del producto, y optimizar la visualización de productos.)

  // Métodos manejados ahora en el padre
  onToggleFav(product: Product): void {
    this.favService.toggleFav(product);
  }

  onShowQuantitySelector(event: {
    productId: number;
    event: MouseEvent;
  }): void {
    event.event.stopPropagation();
    this.selectedProductId = event.productId;
    const currentProduct = this.products.find((p) => p.id === event.productId);
    this.maxStock = currentProduct?.stock || 1;
  }

  onAdjustQuantity(amount: number): void {
    const newQuantity = this.selectedQuantity + amount;
    this.selectedQuantity = Math.max(1, Math.min(newQuantity, this.maxStock));
  }

  onConfirmAddToCart(product: Product): void {
    if (this.selectedQuantity > 0) {
      const fullProduct = this.productService.getProductById(product.id);
      if (fullProduct) {
        for (let i = 0; i < this.selectedQuantity; i++) {
          this.cartService.addProduct(fullProduct);
        }
      }
      this.selectedProductId = null;
    }
  }

  onCancelSelection(): void {
    this.selectedProductId = null;
    this.selectedQuantity = 1;
  }

  @ViewChild('productDetailsCanvas') productDetailsCanvas!: ElementRef;

  // Método para mostrar detalles
  onShowDetails(product: Product): void {
    this.selectedProduct = product;

    // Inicializar offcanvas
    const offcanvas = new window.bootstrap.Offcanvas(
      this.productDetailsCanvas.nativeElement
    );
    offcanvas.show();
  }

  // Método para cerrar detalles
  onCloseDetails(): void {
    const offcanvas = window.bootstrap.Offcanvas.getInstance(
      this.productDetailsCanvas.nativeElement
    );
    offcanvas?.hide();
    this.selectedProduct = null;
  }
}
