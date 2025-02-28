import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  RouterModule} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  editMode = false;
  profileForm!: FormGroup;
  rol: string = ''; // Se asignará según el rol del usuario
  currentUser: any = null; // Aquí almacenaremos los datos del usuario

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener el usuario desde el AuthService
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.rol = user.role || ''; // Asigna el rol del usuario
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      name: [this.currentUser?.name || ''],
      email: [this.currentUser?.email || ''],
      businessName: [this.currentUser?.businessName || ''],
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.initForm(); // Reinitialize the form when toggling off edit mode
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const updatedData = { ...this.currentUser, ...this.profileForm.value };

    // Si el campo 'businessName' está vacío y el rol es 'vendedor', cambiamos el rol a 'cliente'
    if (!this.profileForm.value.businessName && this.rol === 'vendedor') {
      updatedData.role = 'cliente';
    }

    // Si el campo 'businessName' tiene un valor y el rol es 'cliente', cambiamos el rol a 'vendedor'
    if (this.profileForm.value.businessName && this.rol === 'cliente') {
      updatedData.role = 'vendedor';
    }

    // Actualizamos los datos del usuario
    this.authService.updateUserProfile(updatedData).subscribe({
      next: () => {
        this.currentUser = updatedData;
        this.rol = updatedData.role; // Actualizamos el rol
        this.editMode = false;
      },
      error: (err) => console.error('Error al actualizar:', err)
    });
  }
}