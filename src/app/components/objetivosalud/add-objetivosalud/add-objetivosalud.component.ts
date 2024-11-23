import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../models/client';
import { HealthProfessional } from '../../../models/healthprofessional';
import { HealthGoal } from '../../../models/healthgoal';
import { HealthGoalService } from '../../../services/health-goal.service';


@Component({
  selector: 'app-add-objetivosalud',
  templateUrl: './add-objetivosalud.component.html',
  styleUrl: './add-objetivosalud.component.css'
})
export class AddObjetivosaludComponent {

  addEditObjetivosalud!: FormGroup;
  clients!: Client[];
  healthprofessionals!: HealthProfessional[];
  objetivosaludId = 0;

  constructor(
    private clientService: ClientService,
    private healthprofessionalService: HealthprofessionalService,
    private healthGoalService: HealthGoalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.creaFormulario();
  }

  creaFormulario(): void {
    this.clientService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
      }
    });

    this.healthprofessionalService.gethealthprofessionals().subscribe({
      next: (data: HealthProfessional[]) => {
        this.healthprofessionals = data;
      }
    });

    this.addEditObjetivosalud = this.formBuilder.group({
      id: [''],
      goalType: ['', [Validators.required, Validators.minLength(5)]],
      nutritionPlan: ['', [Validators.required, Validators.minLength(5)]],
      clientId: ['', Validators.required],
      healthProfessionalId: ['', Validators.required]
    });

   this.objetivosaludId= parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
   if(this.objetivosaludId==undefined || isNaN(this.objetivosaludId)){
      this.objetivosaludId=0;
    }

    if(this.objetivosaludId>0){
      this.healthGoalService.getHealthGoal(this.objetivosaludId).subscribe({
        next: (dataDetail: HealthGoal) => {
          this.addEditObjetivosalud.get('id')?.setValue(dataDetail.id);
          this.addEditObjetivosalud.get('goalType')?.setValue(dataDetail.goalType);
          this.addEditObjetivosalud.get('nutritionPlan')?.setValue(dataDetail.nutritionPlan);
          this.addEditObjetivosalud.get('clientId')?.setValue(dataDetail.clientId);
          this.addEditObjetivosalud.get('healthProfessionalId')?.setValue(dataDetail.healthProfessionalId);
        }
      });
    }

  }

  grabarObjetivoSalud(): void {
    if (this.addEditObjetivosalud.invalid) {
      return;
    }

    const objetivosalud: HealthGoal = {
      id: this.addEditObjetivosalud.value.id,
      goalType: this.addEditObjetivosalud.value.goalType,
      nutritionPlan: this.addEditObjetivosalud.value.nutritionPlan,
      clientId: this.addEditObjetivosalud.value.clientId,
      healthProfessionalId: this.addEditObjetivosalud.value.healthProfessionalId
    }

    if (this.objetivosaludId == 0) {
      this.healthGoalService.insertHealthGoal(objetivosalud).subscribe({
        next: () => {
          this.snackBar.open('Objetivo de salud guardado correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/objetivosSalud']);
        },
        error: () => {
          this.snackBar.open('Error al guardar el objetivo de salud', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.healthGoalService.editarHealthGoal(objetivosalud).subscribe({
        next: () => {
          this.snackBar.open('Objetivo de salud editado correctamente.', 'OK', { duration: 2000 });
          this.router.navigate(['/objetivosSalud']);
        },
        error: () => {
          this.snackBar.open('Error al editar el objetivo de salud', 'OK', { duration: 2000 });
        }
      });
    }
  }

}
