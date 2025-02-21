import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class FavService {

    // Inicializamos el BehaviorSubject con un array vacío
    private favsSubject = new BehaviorSubject<Product[]>([]);
  
    // Exponemos el observable para que lo pueda consumir el componente
    public favsItems$: Observable<Product[]> = this.favsSubject.asObservable();

  constructor() { }

  toggleFav(product: Product): void {
    const currentFavs = this.favsSubject.getValue();
    const index = currentFavs.findIndex(fav => fav.id === product.id);
    if (index !== -1) {
      // Si el producto ya existe, lo eliminamos
      this.favsSubject.next(currentFavs.filter(fav => fav.id !== product.id));
    } else {
      // Si no está, lo agregamos
      this.favsSubject.next([...currentFavs, product]);
    }
  }

  clearFavs(): void {
    this.favsSubject.next([]);
  }
  
  
}
