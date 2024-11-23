import { Component } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lis-categorias',
  templateUrl: './lis-categorias.component.html',
  styleUrl: './lis-categorias.component.css'
})
export class LisCategoriasComponent {

  displayedColumns: string[] = ['id', 'type', 'description', 'opciones'];
  dsCategorias = new MatTableDataSource<Category>([]);

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoryService.getCategorys().subscribe((categorias: Category[]) => {
      this.dsCategorias.data = categorias;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsCategorias.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
        const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.categoryService.deleteCategory(id).subscribe(() => {
              this.cargarCategorias(); // Refresca la lista después de eliminar
              this.snackBar.open('Categoría eliminada correctamente.', 'OK', { duration: 2000 });
            });
          }
        });
  }
}
