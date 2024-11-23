import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recommendation } from '../models/recommendation';
import { RecommendationReport } from '../models/recommendation_report';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  ruta_servidor:string ="/api";
  recurso:string ="recommendations";

  constructor(private http: HttpClient) {}
  
  getRecommendations(){
    return this.http.get<Recommendation[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getRecommendationReport(){
    return this.http.get<RecommendationReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getRecommendationsByUserId(userId: number) {
    return this.http.get<RecommendationReport[]>(`${this.ruta_servidor}/recommendations/user/${userId}`);
  }
  

  getRecommendation(id:number){
    return this.http.get<Recommendation>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarRecommendation(recommendation:Recommendation){
    return this.http.put<Recommendation>(this.ruta_servidor + "/" + this.recurso+"/"+recommendation.id.toString(),recommendation)
  }

  deleteRecommendation(id:number){
    return this.http.delete<Recommendation>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertRecommendation(recommendation:Recommendation){
    return this.http.post<Recommendation>(this.ruta_servidor + "/" + this.recurso,recommendation);
  }
}
