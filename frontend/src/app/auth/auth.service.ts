import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'api/';
  private isAuthenticated = signal<boolean>(false);
  private usersKey = 'app_users';
  private currentUserKey = 'current_user';

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    this.isAuthenticated.set(!!token);
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, userData).pipe(
      tap((response: any) => this.handleAuthSuccess(response.role)), // Asume que el backend devuelve el rol
      catchError(this.handleError)
    );
  }
  // Modificar métodos de login y registro
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, credentials).pipe(
      tap((response: any) => this.handleAuthSuccess(response.role)), // Asume que el backend devuelve el rol
      catchError(this.handleError)
    );
  }

  private handleAuthSuccess(userRole: string): void {
    // <-- Añadir parámetro de rol
    localStorage.setItem('authToken', 'simulated-token');
    localStorage.setItem('userRole', userRole); // Almacenar rol
    this.isAuthenticated.set(true);

    // Redirección basada en rol
    const targetRoute = userRole === 'vendedor' ? '/vendedor' : '/cliente';
    this.router.navigate([targetRoute]);
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.message || 'Error de servidor'));
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth']);
  }

  get authState() {
    return this.isAuthenticated.asReadonly();
  }

  // En auth.service.ts
  getCurrentUser(): any {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : {};
  }

  updateUserProfile(updatedData: any): Observable<any> {
    const currentUser = this.getCurrentUser();
    const updatedUser = { ...currentUser, ...updatedData };

    // Actualizar localStorage
    localStorage.setItem('current_user', JSON.stringify(updatedUser));

    return of(updatedUser); // Asegúrate de tener importado 'of' de rxjs
  }
}
