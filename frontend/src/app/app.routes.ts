import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { ResearchComponent } from './pages/research/research.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
AuthGuard

export const routes: Routes = [

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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege la ruta
    children: [
      { path: 'perfil', component: PerfilComponent },
      { path: 'research', component: ResearchComponent },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
