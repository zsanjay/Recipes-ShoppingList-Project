import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn : "root"})
export class AuthGuard implements CanActivate{

    constructor(private authService : AuthService , private router : Router , private store : Store<fromApp.AppState>){

    }

    canActivate(route : ActivatedRouteSnapshot , state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

       return this.store.select('auth').pipe(take(1) , map(authState => authState.user), map( user => {

        const isAuthenticated = !!user;

        if(isAuthenticated)
        return true;

        return this.router.createUrlTree(['/auth']);
        }));

        
    }

}