import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  authForm!: FormGroup;
  isLogin = signal<boolean>(true);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Cambia entre modo login y registro y reinicializa el formulario
  toggleMode(isLogin: boolean): void {
    this.isLogin.set(isLogin);
    this.initForm();
  }

  // Inicializa el formulario según el modo
  initForm(): void {
    if (this.isLogin()) {
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


onSubmit(): void {
  if (this.authForm.invalid) return;

  this.isLoading.set(true);
  this.errorMessage.set(null);

  const formData = this.authForm.value;

  if (this.isLogin()) {
    this.authService.login({
      email: formData.email,
      password: formData.password
    }).subscribe({
      next: () => this.isLoading.set(false),
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      }
    });
  } else {
    const { confirmPassword, ...registerData } = formData;
    this.authService.register(registerData).subscribe({
      next: () => this.isLoading.set(false),
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      }
    });
  }
}

  
  // Método para volver a la página de inicio
  goHome(): void {
    this.router.navigate(['/']);
  }
}
