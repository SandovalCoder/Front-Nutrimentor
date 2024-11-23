import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Specialization} from '../models/specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  
  ruta_servidor: string = "/api";
  recurso: string = "specializations";

  constructor(private http: HttpClient) {}


  getSpecializations(){
    return this.http.get<Specialization[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getSpecialization(id:number){
    return this.http.get<Specialization>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarSpecialization(especialidad:Specialization){
    return this.http.put<Specialization>(this.ruta_servidor + "/" + this.recurso+"/"+especialidad.id.toString(),especialidad)
  }

  deleteSpecialization(id:number){
    return this.http.delete<Specialization>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertSpecialization(especialidad:Specialization){
    return this.http.post<Specialization>(this.ruta_servidor + "/" + this.recurso,especialidad);
  }

}
  
