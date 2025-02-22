import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";


export const authGuard = (expectedRole: string): CanActivateFn => {
    return () => {
      const authService = inject(AuthService);
      const router = inject(Router);
      
      const userRole = localStorage.getItem('userRole');
      
      if (authService.authState() && userRole === expectedRole) {
        return true;
      }
      
      router.navigate(['/auth']);
      return false;
    };
  };