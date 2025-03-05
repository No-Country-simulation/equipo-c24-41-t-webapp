import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  activeTab: 'products' | 'profiles' | 'searches' = 'products';

  // Datos de ejemplo
  favoriteProducts = [
    {
      name: 'Cámara DSLR Profesional',
      price: 899.99,
      image: 'https://picsum.photos/300/200'
    },
    {
      name: 'Zapatillas Running Ultra',
      price: 129.99,
      image: 'https://picsum.photos/300/200'
    }
  ];

  favoriteProfiles = [
    {
      name: 'Juan Pérez',
      followers: 2450,
      avatar: 'https://picsum.photos/300/200'
    },
    {
      name: 'TechShop Oficial',
      followers: 18900,
      avatar: 'https://picsum.photos/300/200'
    }
  ];

  favoriteSearches = [
    {
      term: 'cámaras vintage',
      date: 'Buscado hace 2 días'
    },
    {
      term: 'mochilas impermeables',
      date: 'Buscado ayer'
    }
  ];

  setActiveTab(tab: 'products' | 'profiles' | 'searches') {
    this.activeTab = tab;
  }
}
