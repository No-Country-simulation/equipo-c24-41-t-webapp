import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { tap } from 'rxjs/operators';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../../shared/components/products/products.component';
import { AuthService } from '../../auth/auth.service';
import { FavService } from '../../shared/services/fav.service';
import { CartService } from '../../shared/services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';

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
export class ResearchComponent implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;
  searchQuery: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private querySub!: Subscription; 

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
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.products = this.productService.getAllProducts();
    this.filteredProducts = this.products;
    this.favService.favsItems$.subscribe((favs) => (this.favorites = favs));
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.products.forEach((product) => {
      if (product.vendedorId) {
        const vendedor = this.authService.getUserById(product.vendedorId);
        this.vendedorNames[product.vendedorId] =
          vendedor?.businessName || vendedor?.name || 'Anónimo';
      }
    });
  }

  ngOnInit() {
    this.querySub = this.route.queryParams.pipe(
      tap((params: Params) => { // Especificar tipo Params
        this.searchQuery = params['query'] || '';
        this.executeSearch(this.searchQuery);
      })
    ).subscribe();
  }

  private executeSearch(query: string): void {
    if (query) {
      this.productService.searchProducts(query).subscribe({
        next: (results) => {
          this.filteredProducts = results;
          
          // Redirigir si no hay resultados
          if (results.length === 0) {
            const parentRoute = this.getParentRoute();
            this.router.navigate([parentRoute]);
          }
        },
        error: (err) => console.error('Error en búsqueda:', err)
      });
    } else {
      this.filteredProducts = [];
    }
  }

  private getParentRoute(): string {
    const currentUrl = this.location.path();
    
    // Determinar la ruta padre basado en la URL actual
    if (currentUrl.includes('/dashboard/research')) {
      return '/dashboard';
    } else if (currentUrl.includes('/home/research')) {
      return '/home';
    }
    
    // Ruta por defecto si no coincide
    return '/';
  }

  ngOnDestroy() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  // Método para filtrar productos
  private filterProducts(): void {
    if (!this.searchQuery) {
      this.filteredProducts = [...this.products];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(
        (product) =>
          product.nombre.toLowerCase().includes(query) ||
          product.descripcion?.toLowerCase().includes(query)
      );
    }
  }


  onToggleFav(product: Product): void {
    this.filterProducts(); // Call filterProducts to update filteredProducts

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
