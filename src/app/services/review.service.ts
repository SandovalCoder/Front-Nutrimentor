import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';
import { ReviewReport } from '../models/review_report';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  ruta_servidor:string ="/api";
  recurso:string ="reviews";

  constructor(private http: HttpClient) {}
  
  getReviews(){
    return this.http.get<Review[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getReviewReport(){
    return this.http.get<ReviewReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getReviewReportByProduct(productId: number) {
    return this.http.get<ReviewReport[]>(`${this.ruta_servidor}/${this.recurso}/product-report?productId=${productId}`);
  }
  
  
  getReview(id:number){
    return this.http.get<Review>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarReview(review:Review){
    return this.http.put<Review>(this.ruta_servidor + "/" + this.recurso+"/"+review.id.toString(),review)
  }

  deleteReview(id:number){
    return this.http.delete<Review>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertReview(review:Review){
    return this.http.post<Review>(this.ruta_servidor + "/" + this.recurso,review);
  }
}
