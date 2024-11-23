import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthGoal } from '../models/healthgoal';
import { HealthgoalReport } from '../models/healthgoal_report';

@Injectable({
  providedIn: 'root'
})
export class HealthGoalService {

  ruta_servidor:string ="/api";
  recurso:string ="health-goals";

  constructor(private http: HttpClient) {}
  
  getHealthGoals(){
    return this.http.get<HealthGoal[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getHealthGoalReport(){
    return this.http.get<HealthgoalReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getHealthGoal(id:number){
    return this.http.get<HealthGoal>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarHealthGoal(healthGoal:HealthGoal){
    return this.http.put<HealthGoal>(this.ruta_servidor + "/" + this.recurso+"/"+healthGoal.id.toString(),healthGoal)
  }

  deleteHealthGoal(id:number){
    return this.http.delete<HealthGoal>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertHealthGoal(healthGoal:HealthGoal){
    return this.http.post<HealthGoal>(this.ruta_servidor + "/" + this.recurso,healthGoal);
  }
}
