import { Component} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  
  isAdmin: boolean = false;
  isHealthProfessional: boolean = false;
  isUser: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    // Verificar roles del usuario en el constructor
    this.checkUserRoles();
  }

  // Método para verificar los roles del usuario actual
  checkUserRoles() {
    const authorities = this.userService.getAuthoritiesActual();
    if (authorities) {
      this.isAdmin = authorities.includes("ADMIN");
      this.isHealthProfessional = authorities.includes("HEALTH_PROFESSIONAL");
      this.isUser = authorities.includes("USER");
    }
  }

  // Método para verificar si hay un usuario logeado
  hayUsuarioLogeado() {
    return this.userService.hayUsuarioLogeado();
  }

  // Método de logout
  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
