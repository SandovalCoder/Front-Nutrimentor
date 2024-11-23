import { Component } from '@angular/core';
import { Specialization } from '../../../models/specialization';
import { SpecializationService } from '../../../services/specialization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-especialidad',
  templateUrl: './add-especialidad.component.html',
  styleUrl: './add-especialidad.component.css'
})
export class AddEspecialidadComponent {

  addEditEspecialidad!: FormGroup;
  especialidadId = 0;

  constructor(
    private specializationService: SpecializationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.creaFormulario();

    this.especialidadId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    if (isNaN(this.especialidadId)) {
      this.especialidadId = 0;
    }

    if (this.especialidadId > 0) {
      this.cargarCategoria();
    }
  }

  creaFormulario() {
    this.addEditEspecialidad = this.formBuilder.group({
      id: [""],
      specializationName: ["", [Validators.required, Validators.minLength(2)]],
      profileDescription: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  cargarCategoria() {
    this.specializationService.getSpecialization(this.especialidadId).subscribe({
      next: (especialidad: Specialization) => {
        this.addEditEspecialidad.patchValue(especialidad);
      },
      error: (err) => {
        console.error("Error al cargar especialidad:", err);
      }
    });
  }

  grabarCategoria() {
    const especialidad: Specialization = this.addEditEspecialidad.value;

    if (this.especialidadId === 0) {
      // Modo de creación
      this.specializationService.insertSpecialization(especialidad).subscribe({
        next: () => {
          this.router.navigate(['/especialidades']);
          this.snackBar.open("Se registró correctamente la especialidad", "OK", { duration: 2000 });
        },
        error: (err) => {
          this.snackBar.open("Hubo un error en el registro de la especialidad", "OK", { duration: 2000 });
          console.error("Error al registrar especialidad:", err);
        }
      });
    } else {
      // Modo de actualización
      this.specializationService.editarSpecialization(especialidad).subscribe({
        next: () => {
          this.router.navigate(['/especialidades']);
          this.snackBar.open("Se actualizó correctamente la especialidad", "OK", { duration: 2000 });
        },
        error: (err) => {
          this.snackBar.open("Hubo un error en la actualización de la especialidad", "OK", { duration: 2000 });
          console.error("Error al actualizar especialidad:", err);
        }
      });
    }
  }
 
}
