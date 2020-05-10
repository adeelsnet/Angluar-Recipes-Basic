import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  private recipeId: string;
  recipe: Recipe = {title: '', cuisine: '', description: '', chefName: ''};

  constructor(private recipeService: RecipeService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.recipeId = paramMap.get('id');
        this.recipeService.getRecipe(this.recipeId).subscribe((res) => {
          this.recipe = res.recipe;
        });
      }
    });
  }

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['/']);
  }

}
