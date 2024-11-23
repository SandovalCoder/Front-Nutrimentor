import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ClientService } from '../../../services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { Client } from '../../../models/client';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-add-resena',
  templateUrl: './add-resena.component.html',
  styleUrl: './add-resena.component.css'
})
export class AddResenaComponent {

  addEditResena!: FormGroup;
  products: any[] = []; // Productos cargados desde el servicio
  clients: any[] = []; // Clientes cargados desde el servicio
  resenaId = 0;
  fromShopProducts = false; // Indica si viene desde ShopProductsComponent
  productId!: number; // Producto relacionado
  clientId!: number; // Cliente logueado

  constructor(
    private reviewService: ReviewService,
    private productService: ProductService,
    private clientService: ClientService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.clientId = Number(this.userService.getUserIdActual()); // Obtener ID del cliente logueado
    this.fromShopProducts =
      this.activatedRoute.snapshot.queryParams['fromShopProducts'] === 'true'; // Detectar si viene de ShopProductsComponent
    this.productId = Number(
      this.activatedRoute.snapshot.queryParams['productId']
    ); // Obtener ID del producto desde ShopProductsComponent (si existe)

    this.creaFormulario();

    this.resenaId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    if (isNaN(this.resenaId)) {
      this.resenaId = 0;
    }

    if (this.resenaId > 0) {
      this.cargarResena();
    }

    // Cargar listas de productos y clientes si no viene desde ShopProductsComponent
    if (!this.fromShopProducts) {
      this.cargarProductos();
      this.cargarClientes();
    }
  }

  creaFormulario(): void {
    this.addEditResena = this.formBuilder.group({
      id: [''], // ID de la reseña (readonly para edición)
      score: ['', [Validators.required, Validators.min(1), Validators.max(5)]], // Puntuación
      comment: ['', [Validators.required, Validators.minLength(5)]], // Comentario
      productId: [this.fromShopProducts ? this.productId : '', Validators.required], // Producto (solo visible si no viene desde ShopProductsComponent)
      clientId: [this.fromShopProducts ? this.clientId : '', Validators.required], // Cliente (solo visible si no viene desde ShopProductsComponent)
    });
  }

  cargarResena(): void {
    this.reviewService.getReview(this.resenaId).subscribe({
      next: (dataReview: Review) => {
        this.addEditResena.get('id')?.setValue(dataReview.id);
        this.addEditResena.get('score')?.setValue(dataReview.score);
        this.addEditResena.get('comment')?.setValue(dataReview.comment);
        this.addEditResena.get('productId')?.setValue(dataReview.productId);
        this.addEditResena.get('clientId')?.setValue(dataReview.clientId);
      },
    });
  }

  cargarProductos(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar productos.', 'OK', { duration: 2000 });
      },
    });
  }

  cargarClientes(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar clientes.', 'OK', { duration: 2000 });
      },
    });
  }

  grabarResenas(): void {
    if (this.addEditResena.invalid) {
      return;
    }

    const resena: Review = {
      id: this.addEditResena.get('id')?.value || 0,
      score: this.addEditResena.get('score')?.value,
      comment: this.addEditResena.get('comment')?.value,
      productId: this.fromShopProducts
        ? this.productId
        : this.addEditResena.get('productId')?.value,
      clientId: this.fromShopProducts
        ? this.clientId
        : this.addEditResena.get('clientId')?.value,
    };

    if (this.resenaId === 0) {
      this.reviewService.insertReview(resena).subscribe({
        next: () => {
          this.snackBar.open('Reseña registrada correctamente.', 'OK', {
            duration: 2000,
          });
          this.navegarDespuesDeGuardar();
        },
        error: () => {
          this.snackBar.open(
            'Error al registrar la reseña. Verifique los datos o permisos.',
            'OK',
            { duration: 2000 }
          );
        },
      });
    } else {
      this.reviewService.editarReview(resena).subscribe({
        next: () => {
          this.snackBar.open('Reseña actualizada correctamente.', 'OK', {
            duration: 2000,
          });
          this.navegarDespuesDeGuardar();
        },
        error: () => {
          this.snackBar.open('Error al actualizar la reseña.', 'OK', {
            duration: 2000,
          });
        },
      });
    }
  }

  navegarDespuesDeGuardar(): void {
    if (this.fromShopProducts) {
      this.router.navigate(['/shop-products']);
    } else {
      this.router.navigate(['/resenas']);
    }
  }
}
