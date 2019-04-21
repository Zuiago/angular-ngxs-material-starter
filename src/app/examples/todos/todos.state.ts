import { Action, State, StateContext } from '@ngxs/store';
import { v4 as uuid } from 'uuid';
import { ActionTodosAdd, ActionTodosFilter, ActionTodosRemoveDone, ActionTodosToggle } from '@app/examples/todos/todos.actions';
import { Todo, TodosStateModel } from '@app/examples/todos/todos.model';

export const TODOS_KEY = 'EXAMPLES.TODOS';

export const initialState: TodosStateModel = {
  items: [
    { id: uuid(), name: 'Open Todo list example', done: true },
    { id: uuid(), name: 'Check the other examples', done: false },
    {
      id: uuid(),
      name: 'Use Angular NGXS Material Starter in your project',
      done: false
    }
  ],
  filter: 'ALL'
};

@State<TodosStateModel>({
  name: 'todos',
  defaults: initialState
})
export class TodosState {
  @Action(ActionTodosAdd)
  add(
    { getState, patchState }: StateContext<TodosStateModel>,
    { payload }: ActionTodosAdd
  ) {
    patchState({
      items: [
        {
          id: uuid(),
          name: payload.name,
          done: false
        }
      ].concat(getState().items)
    });
  }

  @Action(ActionTodosToggle)
  toggle(
    { getState, patchState }: StateContext<TodosStateModel>,
    { payload }: ActionTodosToggle
  ) {
    patchState({
      items: getState().items.map(
        (item: Todo) =>
          item.id === payload.id ? { ...item, done: !item.done } : item
      )
    });
  }

  @Action(ActionTodosRemoveDone)
  removeDone({ getState, patchState }: StateContext<TodosStateModel>) {
    patchState({
      items: getState().items.filter((item: Todo) => !item.done)
    });
  }

  @Action(ActionTodosFilter)
  filter(
    { patchState }: StateContext<TodosStateModel>,
    { payload }: ActionTodosFilter
  ) {
    patchState({ filter: payload.filter });
  }
}
