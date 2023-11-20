import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
//import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent 
//implements OnDestroy
{

  model: AddCategoryRequest;

  // private addCategorySubscription? : Subscription;
  // //? makes the subcription to be undefined

  
constructor( private categoryService: CategoryService)
{
  this.model ={
    name: '',
    urlHandle: ''
  };
}
 

onFormSubmit(){
  // console.log(this.model)
 //this.addCategorySubscription = 
  this.categoryService.addCategory(this.model)
  .subscribe({
    next: (response) => {

      console.log("This was successful");
      }
    })
  }


  // //implemented interface from AddCategoryComponent in line 12
  // ngOnDestroy(): void {
  //  this.addCategorySubscription?.unsubscribe();
  // }


} 
