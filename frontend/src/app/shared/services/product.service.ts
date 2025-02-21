import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({ providedIn: 'root' })
export class ProductService {
  // Productos estáticos iniciales
  private staticProducts: Product[] = [
    { id: 1, nombre: 'Producto A', precio: 100, descripcion: 'Descripción A' },
    { id: 2, nombre: 'Producto B', precio: 150, descripcion: 'Descripción B' },
  ];

  // Fuente de datos para productos dinámicos
  private dynamicProductsSource = new BehaviorSubject<Product[]>([]);  

  public dynamicProductsPublic$: Observable<Product[]> = this.dynamicProductsSource.asObservable();

  // Combina productos estáticos + dinámicos
  getAllProducts(): Product[] {
    return [...this.staticProducts, ...this.dynamicProductsSource.value]; // Accede al value
  }

  // Añade un nuevo producto con ID único
  addProduct(newProduct: Omit<Product, 'id'>): void {
    const newId = this.generateNewId();
    const productWithId: Product = { ...newProduct, id: newId };
    // Usa dynamicProductsSource (no dynamicProducts$)
    const currentDynamicProducts = this.dynamicProductsSource.value;
    this.dynamicProductsSource.next([...currentDynamicProducts, productWithId]);
  }

  // Genera un ID único evitando colisiones con estáticos
  private generateNewId(): number {
    const maxStaticId = Math.max(...this.staticProducts.map(p => p.id));
    // Usa dynamicProductsSource.value (no dynamicProducts$)
    return maxStaticId + this.dynamicProductsSource.value.length + 1;
  }

}