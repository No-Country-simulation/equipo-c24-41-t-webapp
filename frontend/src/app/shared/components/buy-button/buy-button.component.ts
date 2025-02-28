import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../models/user.model';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-buy-button',
  imports: [],
  templateUrl: './buy-button.component.html',
  styleUrl: './buy-button.component.css'
})
export class BuyButtonComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Puedes agregar lógica de inicialización aquí si es necesario
  }

  toggleRoute(role: string): void {
    this.authService.getCurrentUser().pipe(take(1)).subscribe(user => {
      if (user) {
        const updatedUser: User = { ...user, role };

        // Actualiza localStorage con el nuevo rol
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Actualiza el BehaviorSubject en AuthService para notificar a otros componentes
        this.authService.updateCurrentUser(updatedUser);

        // Redirige al dashboard con el nuevo rol
        this.router.navigate(['/dashboard']);
      }
    });
  }
}