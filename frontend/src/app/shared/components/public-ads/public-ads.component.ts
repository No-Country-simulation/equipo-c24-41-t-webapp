import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-public-ads',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './public-ads.component.html',
  styleUrl: './public-ads.component.css',
})
export class PublicAdsComponent {
  productForm: FormGroup;
  formVisible = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.maxLength(200)],
      imagen: ['', Validators.pattern(/^(http|https):\/\/[^ "]+$/)],
      categoria: ['', Validators.required],
      stock: [null, [Validators.min(0)]],
      ubicacion: ['', Validators.maxLength(50)],
      especificaciones: [''],
    });
  }

  toggleForm() {
    this.formVisible = !this.formVisible;
    if (!this.formVisible) this.productForm.reset();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.authService.currentUser$.subscribe((currentUser) => {
        if (currentUser) {
          console.log('Usuario actual:', currentUser);
  
          const newProduct: Product = {
            ...this.productForm.value,
            vendedorId: currentUser.id,
            publicado: true,
            id: 0,
            categoria: this.productForm.value.categoria,
            stock: this.productForm.value.stock || 0,
            ubicacion: this.productForm.value.ubicacion,
            especificaciones: this.productForm.value.especificaciones,
          } as Product;
  
          this.productService.addProduct(newProduct);
          this.toggleForm();
        }
      });
    }
  }
  
}
