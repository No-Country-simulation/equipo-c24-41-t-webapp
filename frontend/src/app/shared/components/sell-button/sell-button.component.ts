import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-button',
  imports: [],
  templateUrl: './sell-button.component.html',
  styleUrl: './sell-button.component.css'
})
export class SellButtonComponent implements OnInit {

  buttonText: string = 'vender'; // valor por defecto

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.router.url;
    // Si la URL contiene "vendedor", mostramos "comprar"
    if (currentUrl.includes('vendedor')) {
      this.buttonText = 'comprar';
    }
  }

// Método que alterna entre las rutas 'vendedor' y 'cliente' dependiendo de la URL
toggleRoute(): void {
  const currentUrl = this.router.url;
  if (currentUrl.includes('vendedor')) { // Si la URL contiene 'vendedor'
    this.router.navigate(['/cliente']); // Navega a la ruta '/cliente'
  } else if (currentUrl.includes('cliente')) { // Si la URL contiene 'cliente'
    this.router.navigate(['/vendedor']); // Navega a la ruta '/vendedor'
  }
}


}
