import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-perfil',
  imports: [
     CommonModule,
     ReactiveFormsModule
    ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  editMode = false;
  profileForm!: FormGroup;
  rol: string = 'cliente'; // Valor por defecto

  cliente: any = {
    name: '',
    email: ''
  };
  
  vendedor: any = {
    businessName: '',
    email: ''
  };
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Recupera el rol desde la data de la ruta (definido en las rutas como { data: { rol: 'cliente' } } o 'vendedor')
    this.rol = this.route.snapshot.data['rol'] || 'cliente';
  
    // Inicializa el formulario y carga los datos del usuario en base al rol obtenido
    this.initForm();
    this.loadUserData();
  }
  
  private initForm(): void {
    const currentUser = this.authService.getCurrentUser();
    
    this.profileForm = this.fb.group({
      name: [currentUser?.name || '', Validators.required],
      email: [currentUser?.email || '', [Validators.required, Validators.email]],
      ...(this.rol === 'vendedor' && {
        businessName: [currentUser?.businessName || '', Validators.required]
      })
    });
  }
  

  private loadUserData(): void {
    const user = this.authService.getCurrentUser();
    
    if (this.rol === 'cliente') {
      this.cliente = {
        name: user?.name,
        email: user?.email
      };
    } else {
      this.vendedor = {
        businessName: user?.businessName,
        email: user?.email
      };
    }
  }
  
  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) this.initForm();
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    
    const updatedData = this.profileForm.value;
    this.authService.updateUserProfile(updatedData).subscribe({
      next: () => {
        this.loadUserData();
        this.toggleEdit();
      },
      error: (err: any) => console.error('Error al actualizar:', err)
    });
  }
}

