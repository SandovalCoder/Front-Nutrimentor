import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { QuestionReport } from '../models/question_report';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  ruta_servidor:string ="/api";
  recurso:string ="questions";

  constructor(private http: HttpClient) {}
  
  getQuestions(){
    return this.http.get<Question[]>(this.ruta_servidor + "/" + this.recurso);
  }
  getPendingQuestionsByProfessional(healthProfessionalId: number) {
    return this.http.get<QuestionReport[]>(`${this.ruta_servidor}/${this.recurso}/professional/${healthProfessionalId}/pending`);
  }
  
  getQuestionReport(){
    return this.http.get<QuestionReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getQuestion(id:number){
    return this.http.get<Question>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarQuestion(question:Question){
    return this.http.put<Question>(this.ruta_servidor + "/" + this.recurso+"/"+question.id.toString(),question)
  }

  deleteQuestion(id:number){
    return this.http.delete<Question>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertQuestion(question:Question){
    return this.http.post<Question>(this.ruta_servidor + "/" + this.recurso,question);
  }
}
