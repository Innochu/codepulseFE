import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  addCategory(model: AddCategoryRequest) : Observable<void> {
   
return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories/Add-Category`, model)
  };

   getAllCategories(): Observable<Category[]>{
     return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories/Get-All`)
  };
}
