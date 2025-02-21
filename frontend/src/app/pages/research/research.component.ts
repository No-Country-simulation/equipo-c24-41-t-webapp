import { Component,inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../shared/components/search/search.component';
import { HeaderComponent } from '../../core/header/header.component';
import { HomeButtonComponent } from '../../shared/components/home-button/home-button.component';
import { PerfilIconComponent } from '../../shared/components/perfil-icon/perfil-icon.component';


@Component({
  selector: 'app-research',
  imports: [CommonModule,FormsModule, SearchComponent, HeaderComponent, HomeButtonComponent,PerfilIconComponent],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  searchQuery = '';
  searchResults: Product[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.performSearch();
    });
  }

  private performSearch() {
    const allProducts = this.productService.getAllProducts();
    this.searchResults = allProducts.filter(product => 
      product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
