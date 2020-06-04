import { Component , Inject, OnInit , PLATFORM_ID} from '@angular/core';
import * as AuthActions from '../app/auth/store/auth.actions';
import * as fromApp from '../app/store/app.reducer';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private store : Store<fromApp.AppState> , @Inject(PLATFORM_ID) private platformId){}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    
  }
  
}
