import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations : [
    ShoppingListComponent,
    ShoppingListEditComponent
    ],
    imports : [
        SharedModule,
        RouterModule.forChild([
            {path : '' , component : ShoppingListComponent}
        ]),
        FormsModule
    ]
    
})
export class ShoppingListModule{

}