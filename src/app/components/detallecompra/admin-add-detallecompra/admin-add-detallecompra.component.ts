import { Component,OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Buys } from '../../../models/buys';
import { BuysService } from '../../../services/buys.service';
import { BuyDetailService } from '../../../services/buy-detail.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { BuyDetail } from '../../../models/buydetail';


@Component({
  selector: 'app-admin-add-detallecompra',
  templateUrl: './admin-add-detallecompra.component.html',
  styleUrl: './admin-add-detallecompra.component.css'
})
export class AdminAddDetallecompraComponent implements OnInit {
  addEditDetalleCompra!: FormGroup;
  products: Product[] = [];
  buys: Buys[] = []; // Lista de compras
  detalleCompraId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private buyDetailService: BuyDetailService,
    private buyService: BuysService // Servicio de compras
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarProductos();
    this.cargarCompras();
    this.cargarDetalleCompraSiEsEdicion();
  }

  crearFormulario(): void {
    this.addEditDetalleCompra = this.formBuilder.group({
      id: [''],
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      total: [''],
      buysId: ['', Validators.required]
    });

    this.addEditDetalleCompra.get('productId')?.valueChanges.subscribe(() => this.calcularTotal());
    this.addEditDetalleCompra.get('quantity')?.valueChanges.subscribe(() => this.calcularTotal());
  }

  cargarProductos(): void {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: () => this.snackBar.open('Error al cargar productos.', 'OK', { duration: 2000 })
    });
  }

  cargarCompras(): void {
    this.buyService.getBuys().subscribe({
      next: (buys) => (this.buys = buys),
      error: () => this.snackBar.open('Error al cargar compras.', 'OK', { duration: 2000 })
    });
  }

  cargarDetalleCompraSiEsEdicion(): void {
    this.detalleCompraId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0', 10);
    if (this.detalleCompraId > 0) {
      this.buyDetailService.getBuyDetail(this.detalleCompraId).subscribe({
        next: (detalle: BuyDetail) => {
          this.addEditDetalleCompra.patchValue(detalle);
        },
        error: () => this.snackBar.open('Error al cargar el detalle de compra.', 'OK', { duration: 2000 })
      });
    }
  }

  calcularTotal(): void {
    const productId = this.addEditDetalleCompra.get('productId')?.value;
    const quantity = this.addEditDetalleCompra.get('quantity')?.value || 0;
    const product = this.products.find((p) => p.id === productId);
    const price = product ? product.price : 0;
    this.addEditDetalleCompra.get('total')?.setValue(quantity * price);
  }

  grabarDetalleCompra(): void {
    if (this.addEditDetalleCompra.invalid) {
      this.snackBar.open('Por favor, complete todos los campos.', 'OK', { duration: 2000 });
      return;
    }

    const detalleCompra: BuyDetail = this.addEditDetalleCompra.value;

    if (this.detalleCompraId === 0) {
      this.buyDetailService.insertBuyDetail(detalleCompra).subscribe({
        next: () => {
          this.snackBar.open('Detalle de compra guardado correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/detalleCompra']);
        },
        error: () => this.snackBar.open('Error al guardar el detalle de compra.', 'OK', { duration: 2000 })
      });
    } else {
      this.buyDetailService.editarBuyDetail(detalleCompra).subscribe({
        next: () => {
          this.snackBar.open('Detalle de compra actualizado correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/detalleCompra']);
        },
        error: () => this.snackBar.open('Error al actualizar el detalle de compra.', 'OK', { duration: 2000 })
      });
    }
  }
}
