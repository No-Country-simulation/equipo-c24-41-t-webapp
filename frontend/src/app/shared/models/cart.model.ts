import { Product } from './product.model';

export interface CartItem {
  producto: Product; // Verificar si la API devuelve un objeto completo
  cantidad: number; // La API deberia usar "cantidad"
  total: number; //  se debe mapear "supongo"
}
