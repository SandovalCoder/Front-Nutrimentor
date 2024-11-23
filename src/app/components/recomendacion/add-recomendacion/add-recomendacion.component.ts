import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecommendationService } from '../../../services/recommendation.service';
import { HealthGoalService } from '../../../services/health-goal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Recommendation } from '../../../models/recommendation';
import { HealthGoal } from '../../../models/healthgoal';

@Component({
  selector: 'app-add-recomendacion',
  templateUrl: './add-recomendacion.component.html',
  styleUrl: './add-recomendacion.component.css'
})
export class AddRecomendacionComponent {

  addEditRecomendacion!: FormGroup;
  healthGoals!: HealthGoal[];
  recomendacionId = 0;

  constructor(
    private recommendationService: RecommendationService,
    private healthGoalService: HealthGoalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.creaFormulario();
    this.cargarHealthGoals();

    this.recomendacionId = parseInt(this.activatedRoute.snapshot.params['id']);
    if (!this.recomendacionId || isNaN(this.recomendacionId)) {
      this.recomendacionId = 0;
    }

    if (this.recomendacionId > 0) {
      this.cargarRecomendaciones();
    }
  }

  creaFormulario(): void {
    this.addEditRecomendacion = this.formBuilder.group({
      id: [''],
      description: ['', [Validators.required, Validators.minLength(5)]],
      healthGoalId: ['', Validators.required]
    });
  }

  cargarHealthGoals(): void {
    this.healthGoalService.getHealthGoals().subscribe({
      next: (data: HealthGoal[]) => {
        this.healthGoals = data;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al cargar las metas de salud', 'OK', { duration: 2000 });
      }
    });
  
  }

  cargarRecomendaciones(): void {
    this.recommendationService.getRecommendation(this.recomendacionId).subscribe({
      next: (recommendation: Recommendation) => {
        this.addEditRecomendacion.patchValue({
          id: recommendation.id,
          description: recommendation.description,
          healthGoalId: recommendation.healthGoalId
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al cargar la recomendación', 'OK', { duration: 2000 });
      }
    });
  }

  grabarRecomendacion(): void {
    const recomendacion: Recommendation = {
      id: this.recomendacionId,
      description: this.addEditRecomendacion.get('description')?.value,
      healthGoalId: this.addEditRecomendacion.get('healthGoalId')?.value
    };

    if (this.recomendacionId === 0) {
      this.recommendationService.insertRecommendation(recomendacion).subscribe({
        next: () => {
          this.snackBar.open('Recomendación guardada correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/recomendaciones']);
        },
        error: () => {
          this.snackBar.open('Error al guardar la recomendación', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.recommendationService.editarRecommendation(recomendacion).subscribe({
        next: () => {
          this.snackBar.open('Recomendación editada correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/recomendaciones']);
        },
        error: () => {
          this.snackBar.open('Error al editar la recomendación', 'OK', { duration: 2000 });
        }
      });
    }
  }

}
