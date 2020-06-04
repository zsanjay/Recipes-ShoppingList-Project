import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit , OnDestroy {
  @ViewChild('f', {static : false}) slForm : NgForm;

  subscription : Subscription;
  editMode = false;
  editedItem : Ingredient;
  constructor(private store : Store<fromApp.AppState>) { }

  ngOnInit() {

    this.subscription = this.store.select('shoppingList').subscribe((ingState => {
      if(ingState.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = ingState.editedIngredient;
        this.slForm.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        });
      }
      else{
        this.editMode = false;
      }
    })); 
  }


  onSubmit(ngForm : NgForm){

    const formValue = ngForm.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);
    if(!this.editMode){
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    else
    this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));

    this.editMode = false;
    this.slForm.reset();
    
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }
}
