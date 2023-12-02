import { Component } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {

  model: AddBlogpost;

  constructor(private blogPostService: BlogPostService,
    private route: Router){
    this.model = {
      title: '',
      shortDescription: '',
      author: '',
      urlHandle: '',
      content: '',
      featuredUrl: '',
      dateCreated: new Date(),
      isVisible: true

    }
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
