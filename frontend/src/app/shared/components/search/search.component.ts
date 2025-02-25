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

  performSearch() {
    if (this.searchQuery.trim()) {
      // Navega a la subruta 'research' dentro de la ruta actual
      this.router.navigate(['research'], { 
        relativeTo: this.route, // Usa la ruta actual como base
        queryParams: { query: this.searchQuery.trim() }
      });
    }
  }

}
