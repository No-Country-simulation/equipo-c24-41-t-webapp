import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-icon',
  imports: [],
  templateUrl: './perfil-icon.component.html',
  styleUrl: './perfil-icon.component.css'
})
export class PerfilIconComponent {
  constructor(private router: Router) {}

  goToProfile(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('cliente')) {
      this.router.navigate(['/perfil/cliente']);
    } else if (currentUrl.includes('vendedor')) {
      this.router.navigate(['/perfil/vendedor']);
    } else {
      // En caso de que la URL actual no contenga 'cliente' ni 'vendedor'
      this.router.navigate(['/home']);
    }
  }
}
