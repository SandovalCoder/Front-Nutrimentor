import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuyDetail } from '../models/buydetail';
import { BuyDetailReport } from '../models/buydetail_report';

@Injectable({
  providedIn: 'root'
})
export class BuyDetailService {

  ruta_servidor:string ="/api";
  recurso:string ="buy-details";

  constructor(private http: HttpClient) {}
  
  getBuyDetails(){
    return this.http.get<BuyDetail[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getBuyDetailReport(){
    return this.http.get<BuyDetailReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }
  
  getBuyDetail(id:number){
    return this.http.get<BuyDetail>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarBuyDetail(buydetail:BuyDetail){
    return this.http.put<BuyDetail>(this.ruta_servidor + "/" + this.recurso+"/"+buydetail.id.toString(),buydetail)
  }

  deleteBuyDetail(id:number){
    return this.http.delete<BuyDetail>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertBuyDetail(buydetail:BuyDetail){
    return this.http.post<BuyDetail>(this.ruta_servidor + "/" + this.recurso,buydetail);
  }
}
