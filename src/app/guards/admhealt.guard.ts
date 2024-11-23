
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdmhealtGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const role = this.userService.getAuthoritiesActual();

    
    if (role === 'ADMIN' || role === 'HEALTH_PROFESSIONAL' || role === 'USER') {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
