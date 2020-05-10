import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { isNull } from 'util';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {

  editMode: boolean = false;
  private recipeId: string;
  recipe: Recipe = { title: '', cuisine: '', chefName: '', description: '' };

  constructor(private recipeService: RecipeService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) { // the id passed in paramMap.has('id') has to be same as it define in routing module.
        this.editMode = true;
        this.recipeId = paramMap.get('id');
        this.recipeService.getRecipe(this.recipeId).subscribe((res: any) => {
          this.recipe = res.recipe;
        });
      } else {
        this.editMode = false;
        this.recipeId = null;
      }
    });
  }

  saveRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      if (this.editMode) {
        const recipe: Recipe = {
          _id: this.recipeId,
          title: form.value.title,
          cuisine: form.value.cuisine,
          chefName: form.value.chefName,
          description: form.value.description
        }
        if(form.value.specialty === '' || form.value.specialty === null || form.value.specialty === 'Not Available'){
          recipe.specialty = 'N/A';
          console.log(recipe.specialty);
        } else {
          recipe.specialty = form.value.specialty;
          // console.log(recipe.specialty);
        }
        this.recipeService.updateRecipe(recipe);
      } else {
        const recipe = {
          title: form.value.title,
          cuisine: form.value.cuisine,
          chefName: form.value.chefName,
          specialty: form.value.specialty,
          description: form.value.description
        }
        this.recipeService.addRecipe(recipe);
        form.reset();
      }
      this.router.navigate(['/']);
    }
  }
}
