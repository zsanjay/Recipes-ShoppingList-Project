import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = false;
    isLoading = false;
    error: string = null;
    storeSub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {

    }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
        });
    }

    onSwitchMode() {

        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {

        if (!form.valid)
            return;


        if (this.isLoginMode)
            this.store.dispatch(new AuthActions.LoginStart({ email: form.value.email, password: form.value.password }));
        else
            this.store.dispatch(new AuthActions.SignUpStart({ email: form.value.email, password: form.value.password }));

        form.reset();
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy(): void {
        this.storeSub.unsubscribe();
    }

}