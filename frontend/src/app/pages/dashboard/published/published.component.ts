import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-published',
  imports: [CommonModule, RouterLink],
  templateUrl: './published.component.html',
  styleUrl: './published.component.css'
})
export class PublishedComponent {
  activeTab: 'venta' | 'vendidos' = 'venta';
  
  // Datos de ejemplo
  productosEnVenta = [
    {
      id: 1,
      nombre: 'Jarrón de Cerámica',
      precio: 45,
      imagen: 'https://picsum.photos/300/200',
      vistas: 150
    }
  ];

  productosVendidos = [
    {
      id: 2,
      nombre: 'Lámpara Vintage',
      precio: 80,
      imagen: 'https://picsum.photos/300/201',
      fechaVenta: '2024-02-15'
    }
  ];
}
