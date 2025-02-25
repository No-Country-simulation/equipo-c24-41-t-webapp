import { Component } from '@angular/core';
import { HeaderComponent } from "../../core/header/header.component";
import { CartComponent } from "../../shared/components/cart/cart.component";
import { FavsIconComponent } from "../../shared/components/favs-icon/favs-icon.component";
import { FooterComponent } from "../../core/footer/footer.component";
import { FeaturedComponent } from "../../shared/components/featured/featured.component";
import { CategoryComponent } from "../../core/category/category.component";
import { PerfilIconComponent } from "../../shared/components/perfil-icon/perfil-icon.component";
import { SearchComponent } from "../../shared/components/search/search.component";
import { PublicAdsComponent } from "../../shared/components/public-ads/public-ads.component";
import { SellButtonComponent } from '../../shared/components/sell-button/sell-button.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vendedor',
  imports: [HeaderComponent, FooterComponent, CategoryComponent, PerfilIconComponent, SearchComponent, PublicAdsComponent, SellButtonComponent, RouterOutlet],
  templateUrl: './vendedor.component.html',
  styleUrl: './vendedor.component.css'
})
export class VendedorComponent {

}
