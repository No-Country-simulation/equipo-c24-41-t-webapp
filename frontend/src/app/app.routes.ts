import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { ResearchComponent } from './pages/research/research.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cliente', component: ClienteComponent,}, 
    // canActivate: [authGuard('cliente')]
    { path:'vendedor', component: VendedorComponent,},
    // canActivate: [authGuard('vendedor')]
    { path:'perfil/:rol', component: PerfilComponent},
    { path: 'auth', component: LoginRegisterComponent},
    { path: 'research', component: ResearchComponent}
  
];
