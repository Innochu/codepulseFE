import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { UpdateBlogPostRequest } from '../models/update-blogpost-request,models';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  routeSubscription?: Subscription;
 editblogpostSubscription?: Subscription;
  model?: BlogPost;

  constructor(
    private route: ActivatedRoute,
     private blogPostService: BlogPostService,
    private router: Router
  ) {}

  onFormSubmit(): void{
    console.log(this.model);
//     const updateblogpostRequest: UpdateBlogPostRequest ={
//       title: this.model?.title?? '',
//       shortDescription: this.model?.shortDescription?? '',
//       author: this.model?.author??'',
//       urlHandle: this.model?.urlHandle??'',
//       content: this.model?.content??'',
//       featuredUrl: this.model?.author??'',
//        //if urlHandle is null use empty string
//     };

//     //pass this object to service
//     if(this.id){
//    this.editblogpostSubscription =  this.blogPostService.updateCategory(this.id, updateblogpostRequest)
// .subscribe({
//   next: (response) => {
//     this.router.navigateByUrl(`admin/category`);
//   }

//  });
//}


  }

  // onDelete(): void{
  //   if(this.id)
  //   {
  //     this.categoryService.deleteCategory(this.id)
  //     .subscribe({
  //       next: (Response) => {
  //         this.router.navigateByUrl(`admin/category`);
  //       }
  //     })
  //   }
  // }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
   // this.editCategorySubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
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
