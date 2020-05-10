import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';


@NgModule({
  declarations: [RecipeCreateComponent, RecipeListComponent, RecipeViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CKEditorModule,
    HttpClientModule,
    RouterModule
  ]
})
export class RecipesModule { }
