import { Component } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { QuestionReport } from '../../../models/question_report';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrl: './list-preguntas.component.css'
})
export class ListPreguntasComponent {

  displayedColumns: string[] = ['id', 'query', 'response','queryDate','responseDate','state','clientName','healthProfessionalName', 'opciones'];
  dsPreguntas = new MatTableDataSource<QuestionReport>();

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.questionService.getQuestionReport().subscribe({
      next: (preguntas: QuestionReport[]) => {
        this.dsPreguntas.data = preguntas;
      },
      error: () => {
        this.snackBar.open('Error al cargar preguntas', 'OK', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsPreguntas.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.questionService.deleteQuestion(id).subscribe({
          next: () => {
            this.cargarPreguntas();
            this.snackBar.open('Pregunta eliminada correctamente.', 'OK', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Error al eliminar la pregunta', 'OK', { duration: 2000 });
          }
        });
      }
    });
  }

}
