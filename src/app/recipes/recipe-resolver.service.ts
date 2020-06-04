import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable({providedIn : 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{


constructor(private store : Store<fromApp.AppState> , private actions$ : Actions){

}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {

       return this.store.select('recipes').pipe(
            take(1),
            map(recipesState =>  recipesState.recipes), 
        switchMap(recipes => {
            if(recipes.length === 0){
            this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
            }
            else{
                return of(recipes);
            }
        }));
        


    }


    

}