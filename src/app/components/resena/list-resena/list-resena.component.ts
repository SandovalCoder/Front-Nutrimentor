import { Component } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { ReviewReport } from '../../../models/review_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-resena',
  templateUrl: './list-resena.component.html',
  styleUrl: './list-resena.component.css'
})
export class ListResenaComponent {

  displayedColumns: string[] = ['id', 'score', 'comment', 'productName','clientName','opciones'];
  dsResenas = new MatTableDataSource<ReviewReport>();

  constructor(
    private reviewService: ReviewService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarResenas();
  }

  cargarResenas() {
    this.reviewService.getReviewReport().subscribe({
      next: (resenas: ReviewReport[]) => {
        this.dsResenas.data = resenas;
      },
      error: () => {
        this.snackBar.open('Error al cargar resenas', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsResenas.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.deleteReview(id).subscribe({
          next: () => {
            this.cargarResenas();
            this.snackBar.open('Resena eliminada correctamente.', 'OK', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar la resena', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }

}
