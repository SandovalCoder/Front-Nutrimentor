import { Component } from '@angular/core';
import { BuysService } from '../../../services/buys.service';
import { BuysReport } from '../../../models/buys_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-compra',
  templateUrl: './list-compra.component.html',
  styleUrl: './list-compra.component.css'
})
export class ListCompraComponent {

  displayedColumns: string[] = ['id', 'orderDate', 'clientName', 'opciones'];
  dsCompras = new MatTableDataSource<BuysReport>([]);

  constructor(
    private buysService: BuysService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.cargarCompras();
  }

  cargarCompras() {
    this.buysService.getBuysReport().subscribe((compras: BuysReport[]) => {
      this.dsCompras.data = compras;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsCompras.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buysService.deleteBuys(id).subscribe(() => {
          this.cargarCompras(); 
          this.snackBar.open('Compra eliminada correctamente.', 'OK', { duration: 2000 });
        });
      }
    });
  }
 
}

