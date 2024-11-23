import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category  } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  ruta_servidor:string ="/api";
  recurso:string ="categories";

  constructor(private http: HttpClient) {}
  
  getCategorys(){
    return this.http.get<Category[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getCategory(id:number){
    return this.http.get<Category>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarCategory(categoria:Category){
    return this.http.put<Category>(this.ruta_servidor + "/" + this.recurso+"/"+categoria.id.toString(),categoria)
  }

  deleteCategory(id:number){
    return this.http.delete<Category>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertCategory(categoria:Category){
    return this.http.post<Category>(this.ruta_servidor + "/" + this.recurso,categoria);
  }

}
