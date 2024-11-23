import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Buys } from '../models/buys';
import { BuysReport } from '../models/buys_report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuysService {

  ruta_servidor:string ="/api";
  recurso:string ="buys";

  constructor(private http: HttpClient) {}
  
  getBuys(){
    return this.http.get<Buys[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getBuysReport(){
    return this.http.get<BuysReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getBuy(id:number){
    return this.http.get<Buys>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarBuys(buys:Buys){
    return this.http.put<Buys>(this.ruta_servidor + "/" + this.recurso+"/"+buys.id.toString(),buys)
  }

  deleteBuys(id:number){
    return this.http.delete<Buys>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertBuys(buys:Buys){
    return this.http.post<Buys>(this.ruta_servidor + "/" + this.recurso,buys);
  }

}
