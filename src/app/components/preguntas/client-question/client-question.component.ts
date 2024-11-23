import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../services/question.service';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from '../../../models/question';
import { HealthProfesionalReport } from '../../../models/healthprofesionalreport';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-client-question',
  templateUrl: './client-question.component.html',
  styleUrl: './client-question.component.css'
})
export class ClientQuestionComponent implements OnInit {

  healthProfessionals: HealthProfesionalReport[] = [];
  selectedProfessional: HealthProfesionalReport | null = null;
  questionForm!: FormGroup;
  isUserRole: boolean = false;

  constructor(
    private healthProfessionalService: HealthprofessionalService,
    private questionService: QuestionService,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkUserRoles();
    this.loadHealthProfessionals();
    this.initForm();
  }

  checkUserRoles(): void {
    const authorities = this.userService.getAuthoritiesActual();
    if (authorities) {
      this.isUserRole = ['USER', 'ADMIN'].some(role => authorities.includes(role));
    }
  }

  loadHealthProfessionals(): void {
    this.healthProfessionalService.gethealthprofessionalReport().subscribe({
      next: (data: HealthProfesionalReport[]) => (this.healthProfessionals = data),
      error: () => this.snackBar.open('Error al cargar los profesionales', 'OK', { duration: 2000 })
    });
  }

  initForm(): void {
    this.questionForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  selectProfessional(professional: HealthProfesionalReport): void {
    this.selectedProfessional = professional;
  }

  registerQuestion(): void {
    if (!this.selectedProfessional) {
      this.snackBar.open('Debe seleccionar un profesional', 'OK', { duration: 2000 });
      return;
    }

    if (this.questionForm.invalid) {
      this.snackBar.open('Complete todos los campos antes de enviar', 'OK', { duration: 2000 });
      return;
    }

    const question: Question = {
      id: 0,
      query: this.questionForm.value.query,
      response: null,
      queryDate: new Date(),
      responseDate: null,
      clientId: Number(this.userService.getUserIdActual()), 
      healthProfessionalId: this.selectedProfessional.id,
      state: 'PENDING'
    };

    this.questionService.insertQuestion(question).subscribe({
      next: () => {
        this.snackBar.open('Consulta registrada correctamente', 'OK', { duration: 2000 });
        this.resetSelection();
      },
      error: () => this.snackBar.open('Error al registrar la consulta', 'OK', { duration: 2000 })
    });
  }

  resetSelection(): void {
    this.selectedProfessional = null;
    this.questionForm.reset();
  }
  
}
