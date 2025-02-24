import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Productos estáticos iniciales (Estos productos deben ser reemplazados por datos de la API)
  private staticProducts: Product[] = [
    {
      id: 1,
      nombre: 'Camara Profesional',
      precio: 1200,
      descripcion: 'Cámara DSLR 24MP con lente 18-55mm',
      imagen: 'https://i.ibb.co/pjfbYjf1/camara-profecional.webp',
      categoria: 'Electrónica',
      stock: 15,
      ubicacion: 'Lima, Perú',
      especificaciones: 'Sensor CMOS, ISO 100-25600, Grabación 4K'
    },
  ];

  // Fuente de datos para productos dinámicos (Esto debe ser reemplazado por los productos de la API)
  private dynamicProductsSource = new BehaviorSubject<Product[]>([]);

  // Observable para exponer los productos dinámicos (se mantendrá para productos obtenidos de la API)
  public dynamicProductsPublic$: Observable<Product[]> =
    this.dynamicProductsSource.asObservable();

  // Combina productos estáticos + dinámicos
  // En el futuro, esta función debería fusionar los productos estáticos con los que provengan de la API(Aunque los productos estaticos ya no serán necesarios).
  getAllProducts(): Product[] {
    return [...this.staticProducts, ...this.dynamicProductsSource.value]; // Accede al value para obtener los productos dinámicos
  }

  // Añade un nuevo producto con ID único
  // Aca se tiene cambiar la lógica para enviar el producto a la API en vez de solo agregarlo localmente.
  addProduct(newProduct: Omit<Product, 'id'>): void {
    const newId = this.generateNewId();
    console.log('Nuevo producto recibido:', newProduct);
    const productWithId: Product = {
      ...newProduct,
      id: newId,
      vendedorId: newProduct.vendedorId,
    };

    const currentDynamicProducts = this.dynamicProductsSource.value;
    this.dynamicProductsSource.next([...currentDynamicProducts, productWithId]);
  }

  // Genera un ID único evitando colisiones con los productos estáticos (esto es local, pero deberías obtener un ID de la API más adelante)
  private generateNewId(): number {
    const maxStaticId = Math.max(...this.staticProducts.map((p) => p.id));
    //Se usa dynamicProductsSource.value para calcular el ID, pero en la API se deberia permitir gestione este ID
    return maxStaticId + this.dynamicProductsSource.value.length + 1;
  }

  // Método de búsqueda
  searchProducts(query: string): Observable<Product[]> {
    const allProducts = [
      ...this.staticProducts,
      ...this.dynamicProductsSource.value,
    ];
    const filtered = allProducts.filter(
      (product) =>
        product.nombre.toLowerCase().includes(query.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }
}
