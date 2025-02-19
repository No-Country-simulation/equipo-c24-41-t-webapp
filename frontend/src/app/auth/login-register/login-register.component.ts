import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; 

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  authForm!: FormGroup;
  isLogin: boolean = true; // true: login, false: registro

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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

  // Método que maneja el cambio de rol
  onRoleChange(event: any): void {
    const role = event.target.value;
    if (role === 'vendedor') {
      this.authForm.addControl('businessName', new FormControl('', Validators.required));
    } else {
      if (this.authForm.get('businessName')) {
        this.authForm.removeControl('businessName');
      }
    }
  }

  // Enviar formulario
// Método que maneja el envío del formulario
onSubmit(): void {
  if (this.authForm.invalid) {
    console.log('Formulario inválido');
    return;
  }

  if (this.isLogin) {
    // Lógica de login
    this.authService.login(this.authForm.value).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        // Aquí puedes redirigir según el rol del usuario
        const role = res.role; // Asegúrate de que el backend devuelve el rol
        if (role === 'vendedor') {
          this.router.navigate(['/home/vendedor']); // Redirige a /home/vendedor si el rol es vendedor
        } else if (role === 'cliente') {
          this.router.navigate(['/home/cliente']); // Redirige a /home/cliente si el rol es cliente
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
      }
    });
  } else {
    // Lógica de registro
    this.authService.register(this.authForm.value).subscribe({
      next: (res) => {
        console.log('Registro exitoso:', res);
        // Aquí también redirigimos según el rol del usuario
        const role = this.authForm.get('role')?.value; // Utilizamos el valor del formulario, ya que el backend puede no devolver el rol después del registro
        if (role === 'vendedor') {
          this.router.navigate(['/home/vendedor']); // Redirige a /home/vendedor si el rol es vendedor
        } else {
          this.router.navigate(['/home/cliente']); // Redirige a /home/cliente si el rol es cliente
        }
      },
      error: (err) => {
        console.error('Error en registro:', err);
      }
    });
  }
}


  private markFormGroupTouched(formGroup: FormGroup) {
    // Implementación
  }

  private redirectByRole(role: string): void {
    const route = role === 'vendedor' ? '/vendedor' : '/cliente';
    this.router.navigate([route]);
  }
  
  // Método para mostrar errores en la interfaz
  showError(message: string): void {
    // Aquí puedes usar un toast, un alert o un mensaje en el template
    alert(message); // Ejemplo básico con alert
  }
  
  // Método para volver a la página de inicio
  goHome(): void {
    this.router.navigate(['/']);
  }
}
