import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../core/header/header.component";
import { CategoryComponent } from "../../core/category/category.component";
import { SellButtonComponent } from "../../shared/components/sell-button/sell-button.component";
import { FooterComponent } from "../../core/footer/footer.component";
import { HomeButtonComponent } from "../../shared/components/home-button/home-button.component";
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, HeaderComponent, CategoryComponent, SellButtonComponent, FooterComponent, HomeButtonComponent, ReactiveFormsModule],
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
    this.route.paramMap.subscribe(params => {
      this.rol = params.get('rol') ?? 'cliente';
    });
    this.loadUserData();
    this.initForm();
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

