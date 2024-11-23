import { Component } from '@angular/core';
import { RecommendationService } from '../../../services/recommendation.service';
import { RecommendationReport } from '../../../models/recommendation_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-recomendacion',
  templateUrl: './list-recomendacion.component.html',
  styleUrl: './list-recomendacion.component.css'
})
export class ListRecomendacionComponent {

  displayedColumns: string[] = ['id','description', 'healthGoalName','opciones'];
  dsRecomendacion = new MatTableDataSource<RecommendationReport>();

  constructor(
    private recommendationService: RecommendationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarRecomendaciones();
  }

  cargarRecomendaciones() {
    this.recommendationService.getRecommendationReport().subscribe({
      next: (recomendaciones: RecommendationReport[]) => {
        this.dsRecomendacion.data = recomendaciones;
      },
      error: () => {
        this.snackBar.open('Error al cargar recomendaciones', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsRecomendacion.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recommendationService.deleteRecommendation(id).subscribe({
          next: () => {
            this.cargarRecomendaciones();
            this.snackBar.open('Recomendacion eliminada correctamente.', 'OK', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar la recomendacion', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }

}
