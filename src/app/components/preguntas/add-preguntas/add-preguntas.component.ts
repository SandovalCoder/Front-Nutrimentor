import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../models/client';
import { HealthProfessional } from '../../../models/healthprofessional';
import { Question } from '../../../models/question';
import { QuestionService } from '../../../services/question.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-add-preguntas',
  templateUrl: './add-preguntas.component.html',
  styleUrl: './add-preguntas.component.css'
})
export class AddPreguntasComponent {

  addEditPreguntas!: FormGroup;
  clients!: Client[];
  healthprofessionals!: HealthProfessional[];
  preguntasId = 0;

  constructor(
    private clientService: ClientService,
    private healthProfessionalService: HealthprofessionalService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.creaFormulario();
    this.cargarClientes();
    this.cargarProfesionalesSalud();

    this.preguntasId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    if (isNaN(this.preguntasId)) {
      this.preguntasId = 0;
    }

    if (this.preguntasId > 0) {
      this.cargarPregunta();
    }
  }

  creaFormulario(): void {
    this.addEditPreguntas = this.formBuilder.group({
      id: [''],
      query: ['', [Validators.required, Validators.minLength(3)]],
      response: ['', [Validators.required, Validators.minLength(3)]],
      queryDate: ['', Validators.required],
      responseDate: ['', Validators.required],
      state: ['', Validators.required],
      clientId: ['', Validators.required],
      healthProfessionalId: ['', Validators.required]
    });
  }

  cargarClientes(): void {
    this.clientService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
      }
    });
  }
  

  cargarProfesionalesSalud(): void {
    this.healthProfessionalService.gethealthprofessionals().subscribe({
      next: (data: HealthProfessional[]) => {
        this.healthprofessionals = data;
      }
    });
  }

  cargarPregunta(): void {
    this.questionService.getQuestion(this.preguntasId).subscribe({
      next: (data: Question) => {
        this.addEditPreguntas.patchValue(data);
      }
    });
  }

  grabarPregunta(): void {

    const pregunta: Question = {
      id: this.preguntasId,
      query: this.addEditPreguntas.get('query')?.value,
      response: this.addEditPreguntas.get('response')?.value,
      queryDate: this.addEditPreguntas.get('queryDate')?.value,
      responseDate: this.addEditPreguntas.get('responseDate')?.value,
      state: this.addEditPreguntas.get('state')?.value,
      clientId: this.addEditPreguntas.get('clientId')?.value,
      healthProfessionalId: this.addEditPreguntas.get('healthProfessionalId')?.value
    };

    if (this.preguntasId == 0) {
      this.questionService.insertQuestion(pregunta).subscribe({
        next: () => {
          this.snackBar.open('Pregunta creada correctamente', 'OK', { duration: 2000 });
          this.router.navigate(['/preguntas']);
        },
        error: (err) => {
          console.error('Error al crear la pregunta:', err);
          this.snackBar.open('Error al crear la pregunta', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.questionService.editarQuestion(pregunta).subscribe({
        next: () => {
          this.snackBar.open('Pregunta actualizada correctamente', 'OK', { duration: 2000 });
          this.router.navigate(['/preguntas']);
        },
        error: (err) => {
          console.error('Error al actualizar la pregunta:', err);
          this.snackBar.open('Error al actualizar la pregunta', 'OK', { duration: 2000 });
        }
      });
    }

  }
   
}
