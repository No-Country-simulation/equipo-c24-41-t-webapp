import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    // Lista de productos (puede ser estática o provenir de un servicio)
    products: Product[] = [
      { id: 1, nombre: 'Producto A', precio: 100, descripcion: 'Descripción A' },
      { id: 2, nombre: 'Producto B', precio: 150, descripcion: 'Descripción B' },
      // Más productos...
    ];

      // Emisor para notificar que se agregó un producto
  @Output() agregarProducto = new EventEmitter<Product>();

      // Función para emitir el evento al hacer clic
  onAgregar(product: Product): void {
    console.log('Recibido en ClienteComponent:', product);

    this.agregarProducto.emit(product);
  }
  
}



