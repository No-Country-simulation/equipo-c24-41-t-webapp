import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usuarios predefinidos
  private users: User[] = [
    {
      id: 1,
      email: 'admin@ejemplo.com',
      password: '1234',
      name: 'Admin',
      role: 'vendedor',
      businessName: 'Negocio Admin'
    },
    {
      id: 2,
      email: 'user@ejemplo.com',
      password: 'abcd',
      name: 'Usuario',
      role: 'cliente'
    }
  ];

  // Método para validar el login
  login(email: string, password: string): Observable<User> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Guardar usuario en localStorage
      return of(user);
    } else {
      return throwError(() => new Error('Credenciales incorrectas'));
    }
  }
  

  register(newUser: User): Observable<User> {
    // Verificar si el usuario ya existe
    const exists = this.users.some(u => u.email === newUser.email);
    if (exists) {
      return throwError(() => new Error('El email ya está registrado'));
    } else {
      // Agregar el nuevo usuario a la "base de datos" en memoria
      this.users.push(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return of(newUser);
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  updateUserProfile(updatedUser: User): Observable<User> {
    const index = this.users.findIndex(u => u.id === updatedUser.id); // Buscar por ID
    if (index !== -1) {
      // Preservar campos existentes y actualizar solo los modificados
      this.users[index] = { 
        ...this.users[index],
        ...updatedUser,
        id: this.users[index].id // Mantener ID original
      };
      localStorage.setItem('currentUser', JSON.stringify(this.users[index]));
      return of(this.users[index]);
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }
  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
  
}