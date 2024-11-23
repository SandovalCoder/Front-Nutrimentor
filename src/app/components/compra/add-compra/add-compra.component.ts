import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuysService } from '../../../services/buys.service';
import { ClientService } from '../../../services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Buys } from '../../../models/buys';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-add-compra',
  templateUrl: './add-compra.component.html',
  styleUrl: './add-compra.component.css'
})
export class AddCompraComponent {

  addEditCompra!: FormGroup;
  clients!: Client[];
  compraId = 0;

  constructor(
    private buysService: BuysService,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarClientes();

    this.compraId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    if (!this.compraId || isNaN(this.compraId)) {
      this.compraId = 0;
    }

    if (this.compraId > 0) {
      this.cargarCompra();
    }
  }

  crearFormulario(): void {
    this.addEditCompra = this.formBuilder.group({
      id: [''],
      orderDate: [new Date(), Validators.required],
      clientId: ['', Validators.required]
    });
  }

  cargarClientes(): void {
    this.clientService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.snackBar.open('Error al cargar la lista de clientes', 'OK', { duration: 2000 });
      }
    });
  }

  cargarCompra(): void {
    this.buysService.getBuy(this.compraId).subscribe({
      next: (compra: Buys) => {
        this.addEditCompra.patchValue({
          id: compra.id,
          orderDate: compra.orderDate,
          clientId: compra.clientId
        });
      },
      error: (err) => {
        console.error('Error al cargar compra:', err);
        this.snackBar.open('Error al cargar la compra', 'OK', { duration: 2000 });
      }
    });
  }

  grabarCompra(): void {
    const compra: Buys = {
      id: this.compraId,
      orderDate: this.addEditCompra.get('orderDate')?.value,
      clientId: this.addEditCompra.get('clientId')?.value
    };

    if (this.compraId === 0) {
      this.buysService.insertBuys(compra).subscribe({
        next: () => {
          this.snackBar.open('Compra registrada exitosamente', 'OK', { duration: 2000 });
          this.router.navigate(['/compras']);
        },
        error: (err) => {
          console.error('Error al registrar compra:', err);
          this.snackBar.open('Error al registrar la compra', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.buysService.editarBuys(compra).subscribe({
        next: () => {
          this.snackBar.open('Compra actualizada exitosamente', 'OK', { duration: 2000 });
          this.router.navigate(['/compras']);
        },
        error: (err) => {
          console.error('Error al actualizar compra:', err);
          this.snackBar.open('Error al actualizar la compra', 'OK', { duration: 2000 });
        }
      });
    }
  }
  
}
