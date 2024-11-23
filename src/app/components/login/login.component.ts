import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Token } from '../../models/token';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm!: FormGroup;
  hayError: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]], // Validación para el campo de usuario
      password: ['', [Validators.required]]  // Validación para el campo de contraseña
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.hayError = true;
      this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
      return;
    }

    const user: User = {
      id: 0,
      username: this.loginForm.get('userName')?.value, 
      password: this.loginForm.get('password')?.value,
      active: true,
      authorities: '' 
    };

    this.userService.login(user).subscribe({
      next: (data: Token) => {
        this.hayError = false;
        this.mensajeError = '';
        this.mensajeExito = 'Inicio de sesión exitoso';
        
        console.log(data);
        setTimeout(() => {
          this.router.navigate(['/home']);

        }, 2000);  
      },
      error: (err: any) => {  
        this.hayError = true;
        this.mensajeExito = '';
        this.mensajeError = 'Error al iniciar sesión. Verifica tus credenciales.';
        console.log(err);
      }
    });
  }
}