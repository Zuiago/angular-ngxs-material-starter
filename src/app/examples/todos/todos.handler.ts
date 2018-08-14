import {Injectable} from '@angular/core';
import {Actions, ofActionDispatched} from '@ngxs/store';
import {LocalStorageService} from '@app/core';
import {ActionTodosPersist} from '@app/examples/todos/todos.actions';
import {tap} from 'rxjs/operators';
import {TODOS_KEY} from '@app/examples/todos/todos.state';

@Injectable()
export class TodosHandler {
  constructor(private actions$: Actions,
              private localStorageService: LocalStorageService) {
    console.log('todos handler created');

    this.actions$.pipe(ofActionDispatched(ActionTodosPersist),
      tap(action =>
        this.localStorageService.setItem(TODOS_KEY, action.payload.todos)
      ));
  }
}
