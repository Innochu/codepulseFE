import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onFormSubmit(): void{
    console.log(this.category);
    const updateCategoryRequest: UpdateCategoryRequest ={
      name: this.category?.name?? '',
      urlHandle: this.category?.urlHandle?? ''  //if urlHandle is null use empty string
    };

    //pass this object to service
    if(this.id){
   this.editCategorySubscription =  this.categoryService.updateCategory(this.id, updateCategoryRequest)
.subscribe({
  next: (response) => {
    this.router.navigateByUrl(`admin/category`);
  }

  });
}


  }

  onDelete(): void{
    if(this.id)
    {
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (Response) => {
          this.router.navigateByUrl(`admin/category`);
        }
      })
    }
  }


  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
              // Log id, name, and urlHandle to the console
              console.log('ID:', this.category?.id);
              console.log('Name:', this.category?.name);
              console.log('URL Handle:', this.category?.urlHandle);
            }
          });
        }
      }
    });
  }
}
