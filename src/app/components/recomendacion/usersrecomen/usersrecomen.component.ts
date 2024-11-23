import { Component } from '@angular/core';
import { RecommendationService } from '../../../services/recommendation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RecommendationReport } from '../../../models/recommendation_report';
import { HealthGoal } from '../../../models/healthgoal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recommendation } from '../../../models/recommendation';
import { HealthGoalService } from '../../../services/health-goal.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-usersrecomen',
  templateUrl: './usersrecomen.component.html',
  styleUrl: './usersrecomen.component.css'
})
export class UsersrecomenComponent {
  displayedColumns: string[] = ['id', 'description', 'healthGoalName', 'opciones'];
  dsRecomendacion = new MatTableDataSource<RecommendationReport>();
  recomendacionForm: FormGroup;
  healthGoals: HealthGoal[] = [];
  editMode = false;
  selectedRecommendationId: number | null = null;

  constructor(
    private recommendationService: RecommendationService,
    private healthGoalService: HealthGoalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.recomendacionForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      healthGoalId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRecommendations();
    this.loadHealthGoals();
  }

  // Cargar recomendaciones basadas en el userId logueado
  loadRecommendations(): void {
    const userId = parseInt(this.userService.getUserIdActual() || '0', 10);
    console.log('User ID:', userId); // Debugging
    if (userId > 0) {
      this.recommendationService.getRecommendationsByUserId(userId).subscribe({
        next: (recomendaciones: RecommendationReport[]) => {
          this.dsRecomendacion.data = recomendaciones;
        },
        error: () => {
          this.snackBar.open('Error al cargar recomendaciones.', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.snackBar.open('Usuario no autenticado.', 'OK', { duration: 2000 });
    }
  }

  // Cargar objetivos de salud
  loadHealthGoals(): void {
    this.healthGoalService.getHealthGoals().subscribe({
      next: (data: HealthGoal[]) => {
        this.healthGoals = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar objetivos de salud.', 'OK', { duration: 2000 });
      }
    });
  }

  // Guardar o actualizar recomendación
  saveRecommendation(): void {
    if (this.recomendacionForm.invalid) {
      this.snackBar.open('Formulario inválido.', 'OK', { duration: 2000 });
      return;
    }

    const recommendation: Recommendation = {
      id: this.selectedRecommendationId || 0,
      description: this.recomendacionForm.get('description')?.value,
      healthGoalId: this.recomendacionForm.get('healthGoalId')?.value
    };

    if (this.editMode) {
      this.recommendationService.editarRecommendation(recommendation).subscribe({
        next: () => {
          this.snackBar.open('Recomendación actualizada.', 'OK', { duration: 2000 });
          this.resetForm();
          this.loadRecommendations();
        },
        error: () => {
          this.snackBar.open('Error al actualizar recomendación.', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.recommendationService.insertRecommendation(recommendation).subscribe({
        next: () => {
          this.snackBar.open('Recomendación agregada.', 'OK', { duration: 2000 });
          this.resetForm();
          this.loadRecommendations();
        },
        error: () => {
          this.snackBar.open('Error al agregar recomendación.', 'OK', { duration: 2000 });
        }
      });
    }
  }

  // Editar recomendación
  onEdit(recommendation: RecommendationReport): void {
    this.editMode = true;
    this.selectedRecommendationId = recommendation.id;
    this.recomendacionForm.patchValue({
      description: recommendation.description,
      healthGoalId: recommendation.healthGoalName
    });
  }

  // Eliminar recomendación
  onDelete(id: number): void {
    this.recommendationService.deleteRecommendation(id).subscribe({
      next: () => {
        this.snackBar.open('Recomendación eliminada.', 'OK', { duration: 2000 });
        this.loadRecommendations();
      },
      error: () => {
        this.snackBar.open('Error al eliminar recomendación.', 'OK', { duration: 2000 });
      }
    });
  }

  // Filtrar recomendaciones en la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsRecomendacion.filter = filterValue.trim().toLowerCase();
  }

  // Cancelar edición
  cancelEdit(): void {
    this.resetForm();
  }

  // Resetear formulario
  private resetForm(): void {
    this.editMode = false;
    this.selectedRecommendationId = null;
    this.recomendacionForm.reset();
  }
}
