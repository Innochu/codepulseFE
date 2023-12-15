import { Component, OnInit } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {

  model: AddBlogpost;
  categories$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService,
    private route: Router,
    private categoryService: CategoryService){
    this.model = {
      title: '',
      shortDescription: '',
      author: '',
      urlHandle: '',
      content: '',
      featuredUrl: '',
      dateCreated: new Date(),
      isVisible: true,
      rCategory: []

    }
  }
  ngOnInit(): void {
   this.categories$ =  this.categoryService.getAllCategories();
  }
    onFormSubmit(): void{
      this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => 
        this.route.navigateByUrl('admin/blogposts')
      });
      console.log(this.model);
  }
}
