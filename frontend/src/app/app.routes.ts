import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { ResearchComponent } from './pages/research/research.component';

export const routes: Routes = [
  // canActivate: [authGuard('cliente')]
  // canActivate: [authGuard('vendedor')]
  {
    path: 'perfil/:rol',
    component: PerfilComponent,
  },
  {
    path: 'auth',
    component: LoginRegisterComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
    children: [{ path: 'research', component: ResearchComponent }],
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    children: [{ path: 'research', component: ResearchComponent }],
  },
  {
    path: 'vendedor',
    component: VendedorComponent,
    children: [{ path: 'research', component: ResearchComponent }],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home', // Redirige la raíz a /home
  },
];
