import { Component } from '@angular/core';
import { BuyDetailService } from '../../../services/buy-detail.service';
import { BuyDetailReport } from '../../../models/buydetail_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-detallecompra',
  templateUrl: './list-detallecompra.component.html',
  styleUrl: './list-detallecompra.component.css'
})
export class ListDetallecompraComponent {

  displayedColumns: string[] = ['id', 'productName','quantity','buyDate', 'total','opciones'];
  dsDetallesCompra = new MatTableDataSource<BuyDetailReport>();

  constructor(
    private buyDetailService: BuyDetailService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarDetallesCompra();
  }

  cargarDetallesCompra() {
    this.buyDetailService.getBuyDetailReport().subscribe({
      next: (detallesCompra: BuyDetailReport[]) => {
        this.dsDetallesCompra.data = detallesCompra;
      },
      error: () => {
        this.snackBar.open('Error al cargar detalles de compra', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsDetallesCompra.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buyDetailService.deleteBuyDetail(id).subscribe({
          next: () => {
            this.cargarDetallesCompra();
            this.snackBar.open('Detalle de compra eliminado correctamente.', 'OK', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar el detalle de compra', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }

}
