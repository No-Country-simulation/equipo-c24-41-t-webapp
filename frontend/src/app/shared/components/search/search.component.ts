import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
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

  searchQuery = '';
  searchResults: Product[] = [];

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/research'], { 
        queryParams: { query: this.searchQuery.trim() } 
      });
    }
  }


}
