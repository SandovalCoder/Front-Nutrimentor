import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductReport} from '../../../models/product_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrl: './list-producto.component.css'
})
export class ListProductoComponent {

  displayedColumns: string[] = ['id', 'logo', 'name', 'categoryName', 'price', 'stock', 'opciones'];
  dsProductos = new MatTableDataSource<ProductReport>();

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productService.getProductReport().subscribe({
      next: (productos: ProductReport[]) => {
        productos.forEach(product => {
          if (product.logo) {
            // Verificar si el prefijo ya está presente
            if (!product.logo.startsWith('data:image/jpeg;base64,')) {
              product.logo = `data:image/jpeg;base64,${product.logo}`;
            }
          } else {
            // Placeholder para productos sin logo
            product.logo = 'assets/images/placeholder.png';
          }
        });
        this.dsProductos.data = productos; // Asignar productos a la tabla
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.snackBar.open('Error al cargar productos', 'OK', { duration: 2000 });
      }
    });
  }
  
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dsProductos.filter = filterValue;
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.cargarProductos(); // Recargar productos después de eliminar
            this.snackBar.open('Producto eliminado correctamente.', 'OK', { duration: 2000 });
          },
          error: (err) => {
            console.error('Error al eliminar producto:', err);
            this.snackBar.open('Error al eliminar el producto', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }
}
