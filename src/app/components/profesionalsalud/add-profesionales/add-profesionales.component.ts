import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationService } from '../../../services/specialization.service';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialization } from '../../../models/specialization';
import { HealthProfessional } from '../../../models/healthprofessional';

@Component({
  selector: 'app-add-profesionales',
  templateUrl: './add-profesionales.component.html',
  styleUrl: './add-profesionales.component.css'
})
export class AddProfesionalesComponent {

  addEditProfesionalsaludI!: FormGroup;
  specializations!: Specialization[];
  profesionalsaludId = 0;

  constructor(
    private healthProfessionalService: HealthprofessionalService,
    private specializationService: SpecializationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.creaFormulario();
    this.cargarEspecialidades();

    this.profesionalsaludId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    if (isNaN(this.profesionalsaludId)) {
      this.profesionalsaludId = 0;
    }

    if (this.profesionalsaludId > 0) {
      this.cargarProfesionalSalud();
    }
  }

  creaFormulario(): void {
    this.addEditProfesionalsaludI = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      specializationId: ['', Validators.required]
    });
  }

  cargarEspecialidades(): void {
    this.specializationService.getSpecializations().subscribe({
      next: (data: Specialization[]) => {
        this.specializations = data;
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
        this.snackBar.open('Error al cargar las especialidades', 'OK', { duration: 2000 });
      }
    });
  }

  cargarProfesionalSalud(): void {
    this.healthProfessionalService.gethealthprofessional(this.profesionalsaludId).subscribe({
      next: (profesional: HealthProfessional) => {
        this.addEditProfesionalsaludI.patchValue({
          id: profesional.id,
          name: profesional.name,
          email: profesional.email,
          address: profesional.address,
          specializationId: profesional.specializationId
        });
      },
      error: (err) => {
        console.error('Error al cargar profesional de salud:', err);
        this.snackBar.open('Error al cargar el profesional de salud', 'OK', { duration: 2000 });
      }
    });
  }

  grabarProfesionalsalud(): void {
    const profesional: HealthProfessional = {
      id: this.profesionalsaludId,
      name: this.addEditProfesionalsaludI.get('name')?.value,
      email: this.addEditProfesionalsaludI.get('email')?.value,
      address: this.addEditProfesionalsaludI.get('address')?.value,
      specializationId: this.addEditProfesionalsaludI.get('specializationId')?.value
    };

    if (this.profesionalsaludId === 0) {
      this.healthProfessionalService.inserthealthprofessional(profesional).subscribe({
        next: () => {
          this.snackBar.open('Profesional de salud registrado exitosamente', 'OK', { duration: 2000 });
          this.router.navigate(['/profesionales']);
        },
        error: (err) => {
          console.error('Error al registrar profesional de salud:', err);
          this.snackBar.open('Error al registrar el profesional de salud', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.healthProfessionalService.editarhealthprofessional(profesional).subscribe({
        next: () => {
          this.snackBar.open('Profesional de salud actualizado exitosamente', 'OK', { duration: 2000 });
          this.router.navigate(['/profesionales']);
        },
        error: (err) => {
          console.error('Error al actualizar profesional de salud:', err);
          this.snackBar.open('Error al actualizar el profesional de salud', 'OK', { duration: 2000 });
        }
      });
    }
  }
}
