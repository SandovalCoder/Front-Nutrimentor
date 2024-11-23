import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class MultiRoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const role = this.userService.getAuthoritiesActual();

    // Permitir acceso si el rol es ADMIN o HEALTH_PROFESSIONAL
    if (role === 'ADMIN' || role === 'USER') {
      return true;
    }

    // Redirigir si no tiene ninguno de los roles
    this.router.navigate(['/home']);
    return false;
  }
}
