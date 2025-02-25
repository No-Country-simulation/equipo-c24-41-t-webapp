import { Component, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../../shared/components/products/products.component';

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

  ngOnInit() {
    this.detectContext();
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'] || '';
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
      next: (results) => this.searchResults = results 
    });
  } else {
    this.searchResults = this.productService.getAllProducts();
  }
}
}
