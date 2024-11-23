import { Component } from '@angular/core';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';
import { HealthProfesionalReport } from '../../../models/healthprofesionalreport';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-profesionales',
  templateUrl: './list-profesionales.component.html',
  styleUrl: './list-profesionales.component.css'
})
export class ListProfesionalesComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'specializationName','opciones'];
  dsProfesionales = new MatTableDataSource<HealthProfesionalReport>();

  constructor(
    private healthprofessionalService: HealthprofessionalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarProfesionales();
  }

  cargarProfesionales() {
    this.healthprofessionalService.gethealthprofessionalReport().subscribe({
      next: (profesionales: HealthProfesionalReport[]) => {
        this.dsProfesionales.data = profesionales;
      },
      error: () => {
        this.snackBar.open('Error al cargar profesionales', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsProfesionales.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.healthprofessionalService.deletehealthprofessional(id).subscribe({
          next: () => {
            this.cargarProfesionales();
            this.snackBar.open('Profesional eliminado correctamente.', 'OK', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el profesional', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }
}
