import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request.models';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  // standalone: true,
  // imports: [],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})



export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  routeSubscription?: Subscription;
 updateblogpostSubscription?: Subscription;
 getblogpostSubscription?: Subscription;
 deleteblogpostSubscription?: Subscription;
  blogpost?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?:  string[]

  constructor(
    private route: ActivatedRoute,
     private blogPostService: BlogPostService,
    private router: Router,
    private categoryservice: CategoryService
  ) {}



  onFormSubmit(): void {

    if(this.blogpost && this.id){

    
    console.log(this.blogpost);
    var updateBlogPostRequest: UpdateBlogPostRequest = {
        title: this.blogpost?.title ?? '',
        shortDescription: this.blogpost?.shortDescription ?? '',
        author: this.blogpost?.author ?? '',
        urlHandle: this.blogpost?.urlHandle ?? '',
        content: this.blogpost?.content ?? '',
        featuredUrl: this.blogpost?.featuredUrl ?? '',
        dateCreated: this.blogpost.dateCreated, // Reset to null as it's not yet created
        isVisible: this.blogpost.isVisible, // Reset to undefined as visibility is not specified
        rCategory: this.selectedCategories?? []
    };
    // ...
 

     //pass this object to service
     if(this.id){
      this.updateblogpostSubscription =  this.blogPostService.updateBlogPost(this.id, updateBlogPostRequest)
   .subscribe({
     next: (response) => {
       this.router.navigateByUrl(`admin/blogposts`);
     }
   
     });
   }
   
  }

  }
  
  onDelete(): void{
    if(this.id)
    {
     this.deleteblogpostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (Response) => {
          this.router.navigateByUrl(`admin/blogposts`);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
   this.updateblogpostSubscription?.unsubscribe()
   this.getblogpostSubscription?.unsubscribe()
   this.deleteblogpostSubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.categories$ = this.categoryservice.getAllCategories();
    
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
         this.getblogpostSubscription =  this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.blogpost = response;
              this.selectedCategories =  response.categories.map(x => x.id);
              // Log id, name, and urlHandle to the console
              // console.log('ID:', this.blogpost?.id);
              // console.log('Name:', this.blogpost?.name);
              // console.log('URL Handle:', this.blogpost?.urlHandle);
            }
          });
        }
      }
    });
  }


}
