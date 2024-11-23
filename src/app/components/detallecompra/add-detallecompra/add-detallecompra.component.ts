import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { BuysService } from '../../../services/buys.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { Buys } from '../../../models/buys';
import { BuyDetail } from '../../../models/buydetail';
import { BuyDetailService } from '../../../services/buy-detail.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-detallecompra',
  templateUrl: './add-detallecompra.component.html',
  styleUrl: './add-detallecompra.component.css'
})
export class AddDetallecompraComponent {

  addEditDetallecompra!: FormGroup;
  selectedProduct: Product | null = null;
  compraId: number | null = null;

  constructor(
    private productService: ProductService,
    private buyDetailService: BuyDetailService,
    private buysService: BuysService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.creaFormulario();
    const productId = this.activatedRoute.snapshot.queryParamMap.get('productId');
    if (productId) {
      this.cargarProducto(Number(productId));
    }
  }

  creaFormulario(): void {
    this.addEditDetallecompra = this.formBuilder.group({
      id: [''],
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      total: [{ value: '', disabled: true }]
    });

    this.addEditDetallecompra.get('quantity')?.valueChanges.subscribe(() => {
      this.calcularTotal();
    });
  }

  cargarProducto(productId: number): void {
    this.productService.getProduct(productId).subscribe({
      next: (product: Product) => {
        this.selectedProduct = product;
        this.addEditDetallecompra.patchValue({
          productId: product.id,
          total: product.price * this.addEditDetallecompra.get('quantity')?.value
        });
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.snackBar.open('Error al cargar el producto', 'OK', { duration: 2000 });
      }
    });
  }

  calcularTotal(): void {
    const quantity = this.addEditDetallecompra.get('quantity')?.value || 1;
    if (this.selectedProduct) {
      const total = this.selectedProduct.price * quantity;
      this.addEditDetallecompra.patchValue({ total });
    }
  }

  grabarDetalleCompra(): void {
    if (this.addEditDetallecompra.invalid || !this.selectedProduct) {
      this.snackBar.open('Por favor, complete todos los campos', 'OK', { duration: 2000 });
      return;
    }

    if (!this.compraId) {
      const nuevaCompra = {
        id: 0,
        orderDate: new Date(),
        clientId: Number(this.userService.getUserIdActual())
      };

      this.buysService.insertBuys(nuevaCompra).subscribe({
        next: (compra) => {
          this.compraId = compra.id;
          this.registrarDetalleCompra();
        },
        error: (err) => {
          console.error('Error al registrar la compra:', err);
          this.snackBar.open('Error al registrar la compra', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.registrarDetalleCompra();
    }
  }

  registrarDetalleCompra(): void {
    const detalleCompra: BuyDetail = {
      id: 0,
      quantity: this.addEditDetallecompra.get('quantity')?.value,
      total: this.addEditDetallecompra.get('total')?.value,
      productId: this.selectedProduct!.id,
      buysId: this.compraId!
    };

    this.buyDetailService.insertBuyDetail(detalleCompra).subscribe({
      next: () => {
        this.snackBar.open('Detalle de compra registrado correctamente', 'OK', { duration: 2000 });
        this.router.navigate(['/shop-products']);
      },
      error: (err) => {
        console.error('Error al registrar detalle de compra:', err);
        this.snackBar.open('Error al registrar detalle de compra', 'OK', { duration: 2000 });
      }
    });
  }
}
