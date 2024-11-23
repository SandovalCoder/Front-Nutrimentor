import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import {ProductReport} from '../models/product_report';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ruta_servidor:string ="/api";
  recurso:string ="products";

  constructor(private http: HttpClient) {}
  
  getProducts(){
    return this.http.get<Product[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getProductReport(){
    return this.http.get<ProductReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getProduct(id:number){
    return this.http.get<Product>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarProduct(producto:Product){
    return this.http.put<Product>(this.ruta_servidor + "/" + this.recurso+"/"+producto.id.toString(),producto)
  }

  editarLogo(idProduct: number, logoData: FormData){
    return this.http.put<Product>(this.ruta_servidor + "/" + this.recurso+"/"+idProduct.toString()+"/"+"logo",logoData)
  }

  deleteProduct(id:number){
    return this.http.delete<Product>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertProduct(producto:Product){
    return this.http.post<Product>(this.ruta_servidor + "/" + this.recurso,producto);
  }

}
