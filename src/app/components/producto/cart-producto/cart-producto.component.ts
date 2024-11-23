import { Component, OnInit } from '@angular/core';
import { BuyDetailService } from '../../../services/buy-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-producto',
  templateUrl: './cart-producto.component.html',
  styleUrl: './cart-producto.component.css'
})
export class CartProductoComponent implements OnInit {

  cartItems: any[] = []; // Productos en el carrito
  clientId: number | null = null;

  constructor(
    private buyDetailService: BuyDetailService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientId();
    this.loadCartItems();
  }

  // Obtener el clientId del usuario logueado
  loadClientId(): void {
    const storedClientId = this.userService.getAuthoritiesActual(); // Método del servicio
    this.clientId = storedClientId ? Number(storedClientId) : null; // Conversión explícita
  }

  // Cargar los ítems del carrito para el cliente logueado
  loadCartItems(): void {
    if (this.clientId !== null) {
      this.buyDetailService.getBuyDetailReport().subscribe({
        next: (items) => {
          // Filtra los detalles de compra para el cliente logueado
          this.cartItems = items.filter(item => item.clientId === this.clientId);
        },
        error: (err) => {
          console.error('Error al cargar el carrito:', err);
          this.snackBar.open('Error al cargar el carrito', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.snackBar.open('No se encontró un cliente logueado.', 'OK', { duration: 2000 });
    }
  }

  // Eliminar un ítem del carrito
  removeItem(item: any): void {
    this.buyDetailService.deleteBuyDetail(item.id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
        this.snackBar.open('Producto eliminado del carrito', 'OK', { duration: 2000 });
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        this.snackBar.open('Error al eliminar el producto del carrito', 'OK', { duration: 2000 });
      }
    });
  }

  // Vaciar el carrito
  vaciarCarrito(): void {
    const deleteRequests = this.cartItems.map(item =>
      this.buyDetailService.deleteBuyDetail(item.id).toPromise()
    );

    Promise.all(deleteRequests)
      .then(() => {
        this.cartItems = [];
        this.snackBar.open('Carrito vaciado', 'OK', { duration: 2000 });
      })
      .catch((err) => {
        console.error('Error al vaciar el carrito:', err);
        this.snackBar.open('Error al vaciar el carrito', 'OK', { duration: 2000 });
      });
  }

  // Calcular el total del carrito
  calculateTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.total, 0);
  }

  goBack(){
    this.router.navigate(['/shop-products']);
  }
}
