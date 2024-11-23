import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tracking } from '../models/tracking';
import { TrackingReport } from '../models/tracking_report';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  ruta_servidor: string = "/api";
  recurso: string = "trackings";
  constructor(private http: HttpClient) {}
  
  getTrackings(){
    return this.http.get<Tracking[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getTrackingReport(){
    return this.http.get<TrackingReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getTracking(id:number){
    return this.http.get<Tracking>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarTracking(tracking:Tracking){
    return this.http.put<Tracking>(this.ruta_servidor + "/" + this.recurso+"/"+tracking.id.toString(),tracking)
  }

  deleteTracking(id:number){
    return this.http.delete<Tracking>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertTracking(tracking:Tracking){
    return this.http.post<Tracking>(this.ruta_servidor + "/" + this.recurso,tracking);
  }

}
