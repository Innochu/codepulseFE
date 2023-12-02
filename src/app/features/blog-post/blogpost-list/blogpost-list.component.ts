import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blogpost.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit{


  blogposts$?: Observable<BlogPost[]>;

  constructor(private blogpostService: BlogPostService){ }
  
  
  
  
    ngOnInit(): void {
      this.blogposts$ = this.blogpostService.getAllBlogPost();
    }
  
  
    
   //using async pipe to replace observable
  
  // categories?: Category[];
  
  //   constructor(private categoryService: CategoryService){
  //   }
  
  //     ngOnInit(): void {
  //    this.categoryService.getAllCategories();
    //  .subscribe({
    //   next: (response) => {
    //     this.categories = response;
   
  
  
     // }
  
   //  });
      
    
   // }
   


}
