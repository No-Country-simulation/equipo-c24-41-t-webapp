import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  searchQuery = '';
  searchResults: Product[] = [];
  filteredProducts: Product[] = [];


  filterProducts(products: Product[]) {
    if (this.searchQuery) {
      this.filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = products;
    }
  }

  performSearch(): void {
    const query = this.searchQuery.trim();
    this.router.navigate(['/dashboard/research'], {
      queryParams: { query: query || null },
      queryParamsHandling: 'merge'
    });
  }


}
