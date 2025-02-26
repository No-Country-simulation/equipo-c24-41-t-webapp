import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../../shared/components/products/products.component';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-research',
  imports: [CommonModule, FormsModule, ProductsComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css',
})
export class ResearchComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  context: 'cliente' | 'vendedor' | '' | 'root' = 'root';

  searchQuery = '';
  searchResults: Product[] = [];

  constructor(private cdr: ChangeDetectorRef) {}



ngOnInit() {
  this.detectContext();
  this.route.queryParams.pipe(
    tap(() => this.searchResults = []) // Limpiar resultados
  ).subscribe((params) => {
    this.searchQuery = (params as any)['query'] || ''; // Cast a any temporal
    this.performSearch();
  });
}

  private detectContext() {
    const parentRoute = this.route.parent;
    this.context =
      (parentRoute?.snapshot.routeConfig?.path as
        | 'cliente'
        | 'vendedor'
        | '') || 'root';
  }

private performSearch() {
  if (this.searchQuery.trim()) {
    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (results) => {
        this.searchResults = [...results];
        this.cdr.detectChanges(); // Forzar detección de cambios
      }
    });
  } else {
    this.searchResults = [...this.productService.getAllProducts()]; // Nueva referencia
  }
}
}
