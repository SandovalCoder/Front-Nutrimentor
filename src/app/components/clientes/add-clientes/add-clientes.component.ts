import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrl: './add-clientes.component.css'
})
export class AddClientesComponent {

  addEditCliente!: FormGroup;
  clienteId = 0;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.creaFormulario();
    
    this.clienteId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    if (isNaN(this.clienteId)) {
      this.clienteId = 0;
    }

    if (this.clienteId > 0) {
      this.cargarCliente();
    }
  }

  creaFormulario() {
    this.addEditCliente = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required]
     
    });
  }

  cargarCliente() {
  
    this.clientService.getClient(this.clienteId).subscribe({
      next: (cliente: Client) => {
        this.addEditCliente.get("id")?.setValue(cliente.id);
        this.addEditCliente.get("name")?.setValue(cliente.name);
        this.addEditCliente.get("email")?.setValue(cliente.email);
        this.addEditCliente.get("address")?.setValue(cliente.address);
      },
      error: (err) => {
        console.error("Error al cargar cliente:", err);
      }
    });
  }

  grabarCliente() {
    if (this.addEditCliente.invalid) {
      this.snackBar.open('Todos los campos son requeridos.', 'OK', { duration: 2000 });
      return;
    }

    const cliente: Client = {
      id: this.addEditCliente.get("id")?.value,
      name: this.addEditCliente.get("name")?.value,
      email: this.addEditCliente.get("email")?.value,
      address: this.addEditCliente.get("address")?.value
    };

    if(this.clienteId===0){
      this.clientService.insertClient(cliente).subscribe({
        next: () => {
          this.snackBar.open('Cliente agregado correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error al agregar cliente:', err);
          this.snackBar.open('Ocurrió un error al agregar el cliente.', 'OK', { duration: 2000 });
        }
      });
      }else{
        this.clientService.editarClient(cliente).subscribe({
          next: () => {
            this.snackBar.open('Cliente actualizado correctamente.', 'OK', { duration: 2000 });
            this.router.navigate(['/clientes']);
          },
          error: (err) => {
            console.error('Error al actualizar cliente:', err);
            this.snackBar.open('Ocurrió un error al actualizar el cliente.', 'OK', { duration: 2000 });
          }
       });
     }

  }
}

