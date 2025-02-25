import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Input } from '@angular/core';
import { HeaderComponent } from '../../core/header/header.component';
import { CategoryComponent } from '../../core/category/category.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { PerfilIconComponent } from '../../shared/components/perfil-icon/perfil-icon.component';
import { FavsIconComponent } from '../../shared/components/favs-icon/favs-icon.component';
import { CartComponent } from '../../shared/components/cart/cart.component';
import { SellButtonComponent } from '../../shared/components/sell-button/sell-button.component';
import { CartService } from '../../shared/services/cart.service';
import { Product } from '../../shared/models/product.model';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-cliente',
  imports: [CommonModule, HeaderComponent, CategoryComponent, SearchComponent, FooterComponent, PerfilIconComponent, FavsIconComponent, CartComponent, SellButtonComponent, RouterOutlet
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  constructor(private cartService: CartService) {}




}
