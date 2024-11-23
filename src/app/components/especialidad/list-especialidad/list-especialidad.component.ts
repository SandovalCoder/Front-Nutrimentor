import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Specialization } from '../../../models/specialization';
import { SpecializationService } from '../../../services/specialization.service';


@Component({
  selector: 'app-list-especialidad',
  templateUrl: './list-especialidad.component.html',
  styleUrl: './list-especialidad.component.css'
})
export class ListEspecialidadComponent {

  displayedColumns: string[] = ['id', 'specializationName', 'profileDescription', 'opciones'];
  dsEspecialidades = new MatTableDataSource<Specialization>([]);

  constructor(
    private specializationService: SpecializationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.specializationService.getSpecializations().subscribe((especialidades: Specialization[]) => {
      this.dsEspecialidades.data = especialidades;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsEspecialidades.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.specializationService.deleteSpecialization(id).subscribe(() => {
          this.cargarEspecialidades();
          this.snackBar.open('Especialidad eliminada correctamente.', 'OK', { duration: 2000 });
        });
      }
    });
  }
}
