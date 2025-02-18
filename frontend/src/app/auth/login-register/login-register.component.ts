import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit {
  authForm!: FormGroup;
  isLogin: boolean = true; // true: login, false: registro

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Cambia entre modo login y registro y reinicializa el formulario
  toggleMode(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.initForm();
  }

  // Inicializa el formulario según el modo
  initForm(): void {
    if (this.isLogin) {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    } else {
      this.authForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        role: ['cliente', Validators.required]
      }, { validator: this.passwordMatchValidator });
    }
  }

  // Validador para que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    
    if (this.isLogin) {
      // Lógica para iniciar sesión
      console.log('Iniciando sesión con:', this.authForm.value);
      // Aquí podrías llamar a un servicio de autenticación
    } else {
      // Lógica para registro
      console.log('Registrando usuario con:', this.authForm.value);
      // Aquí podrías llamar a un servicio de registro
    }
  }
  
  // Método para volver a la página de inici
  goHome(): void {
    this.router.navigate(['/']);
  }
}
