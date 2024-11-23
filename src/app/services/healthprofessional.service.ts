import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthProfessional} from '../models/healthprofessional';
import { HealthProfesionalReport } from '../models/healthprofesionalreport';


@Injectable({
  providedIn: 'root'
})
export class HealthprofessionalService {

  ruta_servidor:string ="/api";
  recurso:string ="health-professionals";
  
  constructor(private http: HttpClient) {}
  
  gethealthprofessionals(){
    return this.http.get<HealthProfessional[]>(this.ruta_servidor + "/" + this.recurso);
  }

  gethealthprofessionalReport(){
    return this.http.get<HealthProfesionalReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  gethealthprofessional(id:number){
    return this.http.get<HealthProfessional>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarhealthprofessional(healthProfessional:HealthProfessional){
    return this.http.put<HealthProfessional>(this.ruta_servidor + "/" + this.recurso+"/"+healthProfessional.id.toString(),healthProfessional)
  }

  deletehealthprofessional(id:number){
    return this.http.delete<HealthProfessional>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  inserthealthprofessional(healthProfessional:HealthProfessional){
    return this.http.post<HealthProfessional>(this.ruta_servidor + "/" + this.recurso,healthProfessional);
  }

}
