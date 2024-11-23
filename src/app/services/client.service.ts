import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  ruta_servidor: string = "/api";
  recurso: string = "clients";

  constructor(private http: HttpClient) { }

  getClients(){
    return this.http.get<Client[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getClient(id:number){
    return this.http.get<Client>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarClient(cliente:Client){
    return this.http.put<Client>(this.ruta_servidor + "/" + this.recurso+"/"+cliente.id.toString(),cliente)
  }

  deleteClient(id:number){
    return this.http.delete<Client>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertClient(cliente:Client){
    return this.http.post<Client>(this.ruta_servidor + "/" + this.recurso,cliente);
  }

}
