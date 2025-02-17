import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CategoryComponent } from './components/category/category.component';
import { CommonModule } from '@angular/common';
import { AutoAdBannerComponent } from "./components/auto-ad-banner/auto-ad-banner.component";
import { FeaturedComponent } from './components/featured/featured.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FooterComponent, FeaturedComponent, AutoAdBannerComponent, CategoryComponent, HeaderComponent, CommonModule]
})
export class AppComponent {

  isHidden = false;
  private lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY;
    this.isHidden = scrollTop > this.lastScrollTop && scrollTop > 100;
    this.lastScrollTop = scrollTop;
  }

}
