import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';
import { HealthProfessional } from '../../../models/healthprofessional';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  perfilForm!: FormGroup;
  userId!: number; 
  clientData!: Client; 

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarDatosUsuarioLogeado();
  }

  crearFormulario(): void {
    this.perfilForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }], // Campo deshabilitado
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  cargarDatosUsuarioLogeado(): void {
    const userId = this.userService.getUserIdActual();
    if (!userId) {
      this.snackBar.open('No se encontró un usuario logueado.', 'OK', { duration: 2000 });
      return;
    }

    this.userId = parseInt(userId, 10);

    // Cargar datos del cliente
    this.clientService.getClient(this.userId).subscribe({
      next: (cliente: Client) => {
        this.clientData = cliente;
        this.perfilForm.patchValue({
          id: cliente.id,
          name: cliente.name,
          email: cliente.email,
          address: cliente.address
        });
      },
      error: () => {
        this.snackBar.open('Error al cargar los datos del cliente.', 'OK', { duration: 2000 });
      }
    });
  }

  guardarPerfil(): void {
    if (this.perfilForm.invalid) {
      this.snackBar.open('Por favor, complete todos los campos correctamente.', 'OK', { duration: 2000 });
      return;
    }

    const cliente: Client = {
      id: this.userId,
      name: this.perfilForm.get('name')?.value,
      email: this.perfilForm.get('email')?.value,
      address: this.perfilForm.get('address')?.value
    };

    this.clientService.editarClient(cliente).subscribe({
      next: () => {
        this.snackBar.open('Perfil de cliente actualizado correctamente.', 'OK', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Error al actualizar el perfil de cliente.', 'OK', { duration: 2000 });
      }
    });
  }
}
