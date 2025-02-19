import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { CategoryComponent } from '../../core/category/category.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { PerfilIconComponent } from '../../shared/components/perfil-icon/perfil-icon.component';
import { FavsIconComponent } from '../../shared/components/favs-icon/favs-icon.component';
import { CartComponent } from '../../shared/components/cart/cart.component';
import { FeaturedComponent } from '../../shared/components/featured/featured.component';
import { SellButtonComponent } from '../../shared/components/sell-button/sell-button.component';
import { ProductsComponent } from "../../shared/components/products/products.component";

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, HeaderComponent, CategoryComponent, SearchComponent, FooterComponent, PerfilIconComponent, FavsIconComponent, CartComponent, SellButtonComponent, ProductsComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
    isHidden = false;
    private lastScrollTop = 0;
  
    @HostListener('window:scroll', [])
    onScroll(): void {
      const scrollTop = window.scrollY;
      this.isHidden = scrollTop > this.lastScrollTop && scrollTop > 100;
      this.lastScrollTop = scrollTop;
    }
    ngOnInit() {
      console.log('HeaderComponent cargado');
      window.addEventListener('scroll', () => console.log('scroll detectado'));
    }
    
}
