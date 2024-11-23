import { Component } from '@angular/core';
import { HealthGoalService } from '../../../services/health-goal.service';
import { HealthgoalReport } from '../../../models/healthgoal_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-objetivosalud',
  templateUrl: './list-objetivosalud.component.html',
  styleUrl: './list-objetivosalud.component.css'
})
export class ListObjetivosaludComponent {

  displayedColumns: string[] = ['id', 'goalType', 'nutritionPlan','clientName','healthProfessionalName', 'opciones'];
  dsObjetivoSalud = new MatTableDataSource<HealthgoalReport>();

  constructor(
    private healthGoalService: HealthGoalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarObjetivosalud();
  }

  cargarObjetivosalud() {
    this.healthGoalService.getHealthGoalReport().subscribe({
      next: (objetivosalud: HealthgoalReport[]) => {
        this.dsObjetivoSalud.data = objetivosalud;
      },
      error: () => {
        this.snackBar.open('Error al cargar objetivos de salud', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsObjetivoSalud.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.healthGoalService.deleteHealthGoal(id).subscribe({
          next: () => {
            this.cargarObjetivosalud();
            this.snackBar.open('Objetivo de salud eliminado correctamente.', 'OK', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el objetivo de salud', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }

}
