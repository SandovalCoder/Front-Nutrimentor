import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar',
  templateUrl: './confirmar-eliminar.component.html',
  styleUrl: './confirmar-eliminar.component.css'
})
export class ConfirmarEliminarComponent {
  
  constructor (private dialogRef: MatDialogRef<ConfirmarEliminarComponent>) {}
  
  confirmar(){
    this.dialogRef.close(true);
  }

  cancelar(){
    this.dialogRef.close(false);
  }

}
