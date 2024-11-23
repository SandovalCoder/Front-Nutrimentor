import { Component,OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionReport } from '../../../models/question_report';
import { Question } from '../../../models/question';
import { ClientService } from '../../../services/client.service';
import { HealthprofessionalService } from '../../../services/healthprofessional.service';


@Component({
  selector: 'app-professional-question',
  templateUrl: './professional-question.component.html',
  styleUrl: './professional-question.component.css'
})
export class ProfessionalQuestionComponent implements OnInit {

  questions: QuestionReport[] = [];

  constructor(
    private questionService: QuestionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    const healthProfessionalId = Number(localStorage.getItem('userId'));
    this.questionService.getPendingQuestionsByProfessional(healthProfessionalId).subscribe({
      next: (questions: QuestionReport[]) => (this.questions = questions),
      error: () => this.snackBar.open('Error al cargar las preguntas.', 'OK', { duration: 2000 })
    });
  }

  sendResponse(questionReport: QuestionReport): void {
    if (!questionReport.response || questionReport.response.trim() === '') {
      this.snackBar.open('La respuesta no puede estar vacía.', 'OK', { duration: 2000 });
      return;
    }

    const question = {
      ...questionReport,
      responseDate: new Date(),
      state: 'RESPONDED'
    };

    this.questionService.editarQuestion(question).subscribe({
      next: () => {
        this.snackBar.open('Respuesta enviada correctamente.', 'OK', { duration: 2000 });
        this.loadQuestions();
      },
      error: () => this.snackBar.open('Error al enviar la respuesta.', 'OK', { duration: 2000 })
    });
  }
}
