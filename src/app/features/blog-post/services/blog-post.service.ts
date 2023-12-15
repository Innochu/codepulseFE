import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogpost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BookPost/Add-BookPost`, data);
  }

  getAllBlogPost(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BookPost/Get-All-Books`);
 }

 getBlogPostById(id: string): Observable<BlogPost>{
  return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BookPost/${id}`);

}

}
