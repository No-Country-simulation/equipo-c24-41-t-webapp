import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CategoryComponent } from '../../core/category/category.component';
import { FooterComponent } from '../../core/footer/footer.component';
import { HeaderComponent } from '../../core/header/header.component';
import { AutoAdBannerComponent } from '../../shared/components/auto-ad-banner/auto-ad-banner.component';
import { FeaturedComponent } from '../../shared/components/featured/featured.component';

@Component({
  selector: 'app-home',
  imports: [FooterComponent, FeaturedComponent, AutoAdBannerComponent, CategoryComponent, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isHidden = false;
  private lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    this.isHidden = scrollTop > this.lastScrollTop && scrollTop > 100;
    this.lastScrollTop = scrollTop;
  }
}
