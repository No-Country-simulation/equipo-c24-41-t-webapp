import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-public-ads',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './public-ads.component.html',
  styleUrl: './public-ads.component.css'
})
export class PublicAdsComponent {
  productForm: FormGroup;
  formVisible = false;


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.maxLength(200)],
      imagen: ['', Validators.pattern(/^(http|https):\/\/[^ "]+$/)]
    });
  }

  toggleForm() {
    this.formVisible = !this.formVisible;
    if (!this.formVisible) this.productForm.reset();
  }

onSubmit() {
  if (this.productForm.valid) {
    this.productService.addProduct(this.productForm.value); // 👈 Guarda en el servicio
    this.router.navigate(['/cliente']); // Opcional: Redirige al cliente
  }
}
}
