import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path : '' , redirectTo : 'recipes' , pathMatch : 'full'},
  {path : 'recipes' , loadChildren : () => import('./recipes/recipe.module').then(module => module.RecipesModule)}, // lazy loading
  {path : 'shopping-list' , loadChildren : () => import('./shopping-list/shopping-list.module').then(sm => sm.ShoppingListModule)},
  {path : 'auth' , loadChildren : () => import('./auth/auth.module').then(am => am.AuthModule)}

  //loadChildren : './recipes/recipe.module#RecipesModule'
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
