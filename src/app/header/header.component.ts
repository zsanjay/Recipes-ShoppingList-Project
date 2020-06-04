import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  userSub : Subscription;
  isAuthenticated = false;

  constructor(private store : Store<fromApp.AppState>) { }
  

  ngOnInit() {
  this.userSub =   this.store.select('auth').pipe(map(authState => authState.user)).subscribe((user) => {

    this.isAuthenticated = !!user;

  });
    
  }

  onSaveData(){
   this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData(){
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
