import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';


const routes: Routes = [
  {path: '', component: RecipeListComponent},
  {path: 'create-recipe', component: RecipeCreateComponent},
  {path: 'edit-recipe/:id', component: RecipeCreateComponent},
  {path: 'view-recipe/:id', component: RecipeViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
