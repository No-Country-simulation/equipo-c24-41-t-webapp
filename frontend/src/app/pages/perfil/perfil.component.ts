import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  editMode = false;
  profileForm!: FormGroup;
  rol: string = 'cliente';
  currentUser: User | null = null;

  cliente: any = {
    name: '',
    email: '',
  };

  vendedor: any = {
    businessName: '',
    email: '',
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.rol = this.route.snapshot.data['rol'] || 'cliente';
    this.currentUser = this.authService.getCurrentUser();
    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      name: [this.currentUser?.name || '', Validators.required],
      email: [
        this.currentUser?.email || '',
        [Validators.required, Validators.email],
      ],
      businessName: [
        this.currentUser?.businessName || '',
        this.rol === 'vendedor' ? Validators.required : null,
      ],
    });
  }

  private loadUserData(): void {
    const user = this.authService.getCurrentUser();

    if (this.rol === 'cliente') {
      this.cliente = {
        name: user?.name,
        email: user?.email,
      };
    } else {
      this.vendedor = {
        businessName: user?.businessName,
        email: user?.email,
      };
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) this.initForm();
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    
    const updatedData: User = {
      ...this.currentUser,
      ...this.profileForm.value,
      role: this.rol // Forzar el rol actual
    };

    this.authService.updateUserProfile(updatedData).subscribe({
      next: () => {
        this.currentUser = updatedData;
        this.editMode = false;
      },
      error: (err) => console.error('Error al actualizar:', err)
    });
  }
}
