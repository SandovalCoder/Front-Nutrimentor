import { Component } from '@angular/core';
import { TrackingService } from '../../../services/tracking.service';
import { TrackingReport } from '../../../models/tracking_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-seguimiento',
  templateUrl: './list-seguimiento.component.html',
  styleUrl: './list-seguimiento.component.css'
})
export class ListSeguimientoComponent {

  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'weight','height','status','healthGoalName','opciones'];
  dsSeguimientos = new MatTableDataSource<TrackingReport>();

  constructor(
    private trackingService: TrackingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarSeguimientos();
  }

  cargarSeguimientos() {
    this.trackingService.getTrackingReport().subscribe({
      next: (seguimientos: TrackingReport[]) => {
        this.dsSeguimientos.data = seguimientos;
      },
      error: () => {
        this.snackBar.open('Error al cargar seguimientos', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsSeguimientos.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trackingService.deleteTracking(id).subscribe({
          next: () => {
            this.cargarSeguimientos();
            this.snackBar.open('Seguimiento eliminado correctamente.', 'OK', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el seguimiento', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }

}
