import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from '../store/recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects{

    constructor(private actions$ : Actions , private http : HttpClient , private store : Store<fromApp.AppState>){

    }

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://ng-project-recipe-book-c5b33.firebaseio.com/recipes.json');
        }),map((res) =>{

            return res.map(recipes => {
    
              return {...recipes , ingredients : recipes.ingredients ? recipes.ingredients : []};
            });
    
          }),map(res => {
              return new RecipesActions.SetRecipes(res);
          })
        );

    @Effect({dispatch : false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData , recipesState]) => {
           return this.http.put('https://ng-project-recipe-book-c5b33.firebaseio.com/recipes.json', recipesState.recipes);
        })
    );
}