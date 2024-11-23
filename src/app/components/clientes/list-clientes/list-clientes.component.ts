import { Component } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';



@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrl: './list-clientes.component.css'
})
export class ListClientesComponent  {

  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'opciones'];
  dsClientes = new MatTableDataSource<Client>([]);

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientService.getClients().subscribe((clientes: Client[]) => {
      this.dsClientes.data = clientes;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsClientes.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(id).subscribe(() => {
          this.cargarClientes(); 
          this.snackBar.open('Cliente eliminado correctamente.', 'OK', { duration: 2000 });
        }, error => {
          console.error('Error al eliminar el cliente:', error);
          this.cargarClientes();
          this.snackBar.open('Ocurrió un error al eliminar el cliente.', 'OK', { duration: 2000 });
        });
      }
    });
  }
}