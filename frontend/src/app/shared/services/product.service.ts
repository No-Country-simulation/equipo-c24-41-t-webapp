import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Productos estáticos iniciales (Estos productos deben ser reemplazados por datos de la API)
  private staticProducts: Product[] = [
    {
      id: 1,
      nombre: 'Jarrón de Cerámica Artesanal',
      precio: 45,
      descripcion:
        'Jarrón hecho a mano con diseños únicos, perfecto para decoración.',
      imagen: 'https://picsum.photos/id/237/300/300', // Imagen genérica de cerámica
      categoria: 'Decoración',
      stock: 10,
      ubicacion: 'Cusco, Perú',
      especificaciones: 'Altura: 30cm, Material: Cerámica, Pintura no tóxica',
    },
    {
      id: 2,
      nombre: 'Manta de Alpaca',
      precio: 120,
      descripcion: 'Manta tejida a mano con lana de alpaca, suave y cálida.',
      imagen: 'https://picsum.photos/id/1025/300/300', // Imagen genérica de textiles
      categoria: 'Textiles',
      stock: 8,
      ubicacion: 'Puno, Perú',
      especificaciones:
        'Tamaño: 150x200cm, Material: 100% Alpaca, Colores naturales',
    },
    {
      id: 3,
      nombre: 'Collar de Plata y Turquesa',
      precio: 85,
      descripcion: 'Collar artesanal con detalles en plata y piedra turquesa.',
      imagen: 'https://picsum.photos/id/1084/300/300', // Imagen genérica de joyería
      categoria: 'Joyería',
      stock: 15,
      ubicacion: 'Arequipa, Perú',
      especificaciones:
        'Longitud: 45cm, Material: Plata 925, Piedra: Turquesa natural',
    },
    {
      id: 4,
      nombre: 'Bolso de Cuero Grabado',
      precio: 90,
      descripcion: 'Bolso de cuero genuino con grabados artesanales.',
      imagen: 'https://picsum.photos/id/569/300/300', // Imagen genérica de cuero
      categoria: 'Accesorios',
      stock: 12,
      ubicacion: 'Trujillo, Perú',
      especificaciones:
        'Dimensiones: 25x30x10cm, Material: Cuero vacuno, Asas ajustables',
    },
    {
      id: 5,
      nombre: 'Set de Tazas de Barro',
      precio: 35,
      descripcion:
        'Set de 4 tazas de barro cocido, ideales para bebidas calientes.',
      imagen: 'https://picsum.photos/id/30/300/300', // Imagen genérica de tazas
      categoria: 'Vajilla',
      stock: 20,
      ubicacion: 'Ayacucho, Perú',
      especificaciones:
        'Capacidad: 300ml por taza, Material: Barro cocido, Acabado natural',
    },
    {
      id: 6,
      nombre: 'Pulsera de Hilos Multicolores',
      precio: 15,
      descripcion: 'Pulsera tejida a mano con hilos de colores vibrantes.',
      imagen: 'https://picsum.photos/id/106/300/300', // Imagen genérica de pulseras
      categoria: 'Joyería',
      stock: 25,
      ubicacion: 'Lima, Perú',
      especificaciones: 'Ajustable, Material: Hilos de algodón, Hecho a mano',
    },
    {
      id: 7,
      nombre: 'Escultura de Madera Tallada',
      precio: 200,
      descripcion:
        'Escultura artesanal tallada en madera de cedro, representando figuras tradicionales.',
      imagen: 'https://picsum.photos/id/158/300/300', // Imagen genérica de esculturas
      categoria: 'Arte',
      stock: 5,
      ubicacion: 'Amazonas, Perú',
      especificaciones:
        'Altura: 40cm, Material: Madera de cedro, Acabado natural',
    },
    {
      id: 8,
      nombre: 'Chalina de Lana de Oveja',
      precio: 50,
      descripcion:
        'Chalina tejida a mano con lana de oveja, ideal para climas fríos.',
      imagen: 'https://picsum.photos/id/211/300/300', // Imagen genérica de textiles
      categoria: 'Textiles',
      stock: 18,
      ubicacion: 'Cajamarca, Perú',
      especificaciones:
        'Longitud: 180cm, Material: Lana de oveja, Colores variados',
    },
    {
      id: 9,
      nombre: 'Porta Vela de Piedra',
      precio: 30,
      descripcion:
        'Porta vela tallado en piedra, ideal para crear ambientes relajantes.',
      imagen: 'https://picsum.photos/id/239/300/300', // Imagen genérica de decoración
      categoria: 'Decoración',
      stock: 14,
      ubicacion: 'Huancayo, Perú',
      especificaciones:
        'Diámetro: 10cm, Material: Piedra volcánica, Acabado rústico',
    },
    {
      id: 10,
      nombre: 'Sombrero de Paja Toquilla',
      precio: 40,
      descripcion:
        'Sombrero tejido a mano con paja toquilla, ligero y elegante.',
      imagen: 'https://picsum.photos/id/342/300/300', // Imagen genérica de sombreros
      categoria: 'Accesorios',
      stock: 10,
      ubicacion: 'Piura, Perú',
      especificaciones: 'Talla única, Material: Paja toquilla, Protección UV',
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

  private normalizeText(text: string): string {
    return text
      .normalize('NFD') // Separa caracteres y diacríticos (ej: 'ç' -> 'c' + '̧')
      .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
      .toLowerCase();
  }

  // Método de búsqueda
  searchProducts(query: string): Observable<Product[]> {
    const normalizedQuery = this.normalizeText(query);
    const allProducts = this.getAllProducts();

    const filtered = allProducts.filter((product) => {
      const nombre = this.normalizeText(product.nombre || '');
      const descripcion = this.normalizeText(product.descripcion || '');
      const categoria = this.normalizeText(product.categoria || '');

      return (
        nombre.includes(normalizedQuery) ||
        descripcion.includes(normalizedQuery) ||
        categoria.includes(normalizedQuery)
      );
    });

    return of(filtered);
  }
  getProductById(id: number): Product | undefined {
    const allProducts = this.getAllProducts();
    return allProducts.find((product) => product.id === id);
  }
}
