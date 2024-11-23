import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthProfessional } from '../../../models/healthprofessional';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-perfilprofesional',
  templateUrl: './perfilprofesional.component.html',
  styleUrl: './perfilprofesional.component.css'
})
export class PerfilprofesionalComponent {

  perfilForm!: FormGroup;
  userId!: number; // ID del usuario logueado
  healthProfessionalData!: HealthProfessional; // Datos del profesional de salud

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private healthProfessionalService: HealthprofessionalService,
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
      address: ['', [Validators.required, Validators.minLength(5)]],
      specialization: [{ value: '', disabled: true }] // Campo estático
    });
  }

  cargarDatosUsuarioLogeado(): void {
    const userId = this.userService.getUserIdActual();
    if (!userId) {
      this.snackBar.open('No se encontró un usuario logueado.', 'OK', { duration: 2000 });
      return;
    }
  
    this.userId = parseInt(userId, 10);
  
    // Obtener el profesional de salud asociado al usuario
    this.userService.getHealthProfessionalByUserId(this.userId).subscribe({
      next: (profesional: HealthProfessional) => {
        this.healthProfessionalData = profesional;
        this.perfilForm.patchValue({
          id: profesional.id,
          name: profesional.name,
          email: profesional.email,
          address: profesional.address,
          specialization: `Especialización ID: ${profesional.specializationId}`
        });
      },
      error: () => {
        this.snackBar.open('No se encontró información del profesional de salud.', 'OK', { duration: 2000 });
      }
    });
  }
  
  guardarPerfil(): void {
    if (this.perfilForm.invalid) {
      this.snackBar.open('Por favor, complete todos los campos correctamente.', 'OK', { duration: 2000 });
      return;
    }

    const profesional: HealthProfessional = {
      id: this.userId,
      name: this.perfilForm.get('name')?.value,
      email: this.perfilForm.get('email')?.value,
      address: this.perfilForm.get('address')?.value,
      specializationId: this.healthProfessionalData.specializationId // No se modifica
    };

    this.healthProfessionalService.editarhealthprofessional(profesional).subscribe({
      next: () => {
        this.snackBar.open('Perfil actualizado correctamente.', 'OK', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Error al actualizar el perfil.', 'OK', { duration: 2000 });
      }
    });
  }
}
