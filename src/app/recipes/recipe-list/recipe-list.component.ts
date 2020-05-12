import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes();
    this.recipeService.updatedRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;

    });
  }

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id);
  }

}
