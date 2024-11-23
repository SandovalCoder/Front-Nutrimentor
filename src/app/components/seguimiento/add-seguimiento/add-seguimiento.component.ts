import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthGoalService } from '../../../services/health-goal.service';
import { TrackingService } from '../../../services/tracking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthGoal } from '../../../models/healthgoal';
import { Tracking } from '../../../models/tracking';

@Component({
  selector: 'app-add-seguimiento',
  templateUrl: './add-seguimiento.component.html',
  styleUrl: './add-seguimiento.component.css'
})
export class AddSeguimientoComponent {

  addEditSeguimiento!: FormGroup;
  healthGoals!: HealthGoal[];
  seguimientoId = 0;

  constructor(
    private trackingService: TrackingService,
    private healthGoalService: HealthGoalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarHealthGoals();

    this.seguimientoId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    if (isNaN(this.seguimientoId)) {
      this.seguimientoId = 0;
    }

    if (this.seguimientoId > 0) {
      this.cargarSeguimiento();
    }
  }

  crearFormulario(): void {
    this.addEditSeguimiento = this.formBuilder.group({
      id: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0)]],
      height: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      healthGoalId: ['', Validators.required]
    });
  }

  cargarHealthGoals(): void {
    this.healthGoalService.getHealthGoals().subscribe({
      next: (data: HealthGoal[]) => {
        this.healthGoals = data;
      },
      error: (err) => {
        console.error('Error al cargar objetivos de salud:', err);
        this.snackBar.open('Error al cargar los objetivos de salud', 'OK', { duration: 2000 });
      }
    });
  }

  cargarSeguimiento(): void {
    this.trackingService.getTracking(this.seguimientoId).subscribe({
      next: (seguimiento: Tracking) => {
        this.addEditSeguimiento.patchValue({
          id: seguimiento.id,
          startDate: seguimiento.startDate,
          endDate: seguimiento.endDate,
          weight: seguimiento.weight,
          height: seguimiento.height,
          status: seguimiento.status,
          healthGoalId: seguimiento.healthGoalId
        });
      },
      error: (err) => {
        console.error('Error al cargar seguimiento:', err);
        this.snackBar.open('Error al cargar el seguimiento', 'OK', { duration: 2000 });
      }
    });
  }

  grabarSeguimiento(): void {
    if (this.addEditSeguimiento.invalid) {
      this.snackBar.open('Por favor, completa todos los campos obligatorios', 'OK', { duration: 2000 });
      return;
    }

    const seguimiento: Tracking = {
      id: this.addEditSeguimiento.get('id')?.value,
      startDate: this.addEditSeguimiento.get('startDate')?.value,
      endDate: this.addEditSeguimiento.get('endDate')?.value,
      weight: this.addEditSeguimiento.get('weight')?.value,
      height: this.addEditSeguimiento.get('height')?.value,
      status: this.addEditSeguimiento.get('status')?.value,
      healthGoalId: this.addEditSeguimiento.get('healthGoalId')?.value
    };

    if (this.seguimientoId === 0) {
      this.trackingService.insertTracking(seguimiento).subscribe({
        next: () => {
          this.snackBar.open('Seguimiento registrado exitosamente', 'OK', { duration: 2000 });
          this.router.navigate(['/seguimientos']);
        },
        error: (err) => {
          console.error('Error al registrar seguimiento:', err);
          this.snackBar.open('Error al registrar el seguimiento', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.trackingService.editarTracking(seguimiento).subscribe({
        next: () => {
          this.snackBar.open('Seguimiento actualizado exitosamente', 'OK', { duration: 2000 });
          this.router.navigate(['/seguimientos']);
        },
        error: (err) => {
          console.error('Error al actualizar seguimiento:', err);
          this.snackBar.open('Error al actualizar el seguimiento', 'OK', { duration: 2000 });
        }
      });
    }
  }
  
}
