import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  private recipeUpdates = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.http.get<{ message: string, recipes: Recipe[] }>('http://localhost:3000/api/all-recipes')
      .subscribe((res) => {
        this.recipes = res.recipes;
        // console.log(this.recipes)
        this.recipeUpdates.next([...this.recipes]);
      });
  }

  getRecipe(id: string) {
    return this.http.get<{message:string, recipe: Recipe}>(`http://localhost:3000/api/recipe/${id}`);
  }

  addRecipe(recipe: Recipe) {
    const recipeData = new FormData();
    recipeData.append("title", recipe.title);
    recipeData.append("cuisine", recipe.cuisine);
    recipeData.append("chefName", recipe.chefName);
    recipeData.append("description", recipe.description);
    recipeData.append("specialty", recipe.specialty);
    recipeData.append("image", recipe.image, recipe.title);

    this.http.post<{message: string, recipe: Recipe}>(`http://localhost:3000/api/recipe/`, recipeData)
      .subscribe((resRecipe) => {
        this.recipes.push(resRecipe.recipe);
        this.recipeUpdates.next([...this.recipes]);
      });

  }

  updateRecipe(recipe: Recipe) {
    this.http.put<{message: string, recipe: Recipe}>(`http://localhost:3000/api/recipe/${recipe._id}`, recipe)
      .subscribe(() => {

        const updatedRecipes = [...this.recipes];
        const oldRecipeIndex = updatedRecipes.findIndex(r => r._id === recipe._id)
        updatedRecipes[oldRecipeIndex] = recipe;
        this.recipes = updatedRecipes;
        this.getRecipes();
        this.recipeUpdates.next([...this.recipes]);
      });
  }

  updateRecipeWithImage(recipe: Recipe) {
    const recipeData = new FormData();
    recipeData.append("title", recipe.title);
    recipeData.append("cuisine", recipe.cuisine);
    recipeData.append("chefName", recipe.chefName);
    recipeData.append("description", recipe.description);
    recipeData.append("specialty", recipe.specialty);
    recipeData.append("image", recipe.image, recipe.title);

    this.http.put<{message: string, recipe: Recipe}>(`http://localhost:3000/api/recipe/${recipe._id}`, recipeData)
      .subscribe((resRecipe) => {
        const updatedRecipes = [...this.recipes];
        const oldRecipeIndex = updatedRecipes.findIndex(r => r._id === recipe._id)
        updatedRecipes[oldRecipeIndex] = resRecipe.recipe;
        this.recipes = updatedRecipes;
        this.getRecipes();
        this.recipeUpdates.next([...this.recipes]);
      });
  }

  deleteRecipe(id: string) {
    this.http.delete(`http://localhost:3000/api/recipe/${id}`)
      .subscribe((res) => {
        const updatedRecipes = this.recipes.filter(recipe => recipe._id !== id);
        this.recipes = updatedRecipes;
        this.recipeUpdates.next([...this.recipes]);
      });
  }

  updatedRecipes() {
    return this.recipeUpdates.asObservable();
  }
}
