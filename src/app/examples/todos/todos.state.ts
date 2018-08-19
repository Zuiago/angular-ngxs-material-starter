import {Action, State, StateContext} from '@ngxs/store';
import {
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeLanguage,
  ActionConfiguracoesChangeTheme,
} from './configuracoes.actions';
import {v4 as uuid} from 'uuid';
import {ActionTodosAdd, ActionTodosFilter, ActionTodosRemoveDone, ActionTodosToggle} from '@app/examples/todos/todos.actions';

export const TODOS_KEY = 'EXAMPLES.TODOS';

export const initialState: TodosStateModel = {
  items: [
    {id: uuid(), name: 'Open Todo list example', done: true},
    {id: uuid(), name: 'Check the other examples', done: false},
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
  add({getState, patchState}: StateContext<TodosStateModel>, {payload}: ActionTodosAdd) {
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
  toggle({getState, patchState}: StateContext<TodosStateModel>, {payload}: ActionTodosToggle) {
    patchState({
      items: getState().items.map(
        (item: Todo) =>
          item.id === payload.id ? {...item, done: !item.done} : item
      )
    });
  }

  @Action(ActionTodosRemoveDone)
  removeDone({getState, patchState}: StateContext<TodosStateModel>) {
    patchState({
      items: getState().items.filter((item: Todo) => !item.done)
    });
  }

  @Action(ActionTodosFilter)
  filter({patchState}: StateContext<TodosStateModel>, {payload}: ActionTodosFilter) {
    patchState({filter: payload.filter });
  }
}

export interface Todo {
  id: string;
  name: string;
  done: boolean;
}

export type TodosFilter = 'ALL' | 'DONE' | 'ACTIVE';

export interface TodosStateModel {
  items: Todo[];
  filter: TodosFilter;
}

