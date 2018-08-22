import { ConfiguracoesStateModel } from './configuracoes.state';
import { Todo, TodosFilter } from '@app/examples/todos/todos.state';

export enum TodosActionTypes {
  ADD = '[Todos] Add',
  TOGGLE = '[Todos] Toggle',
  REMOVE_DONE = '[Todos] Remove Done',
  FILTER = '[Todos] Filter',
  PERSIST = '[Todos] Persist'
}

export class ActionTodosAdd {
  static readonly type = TodosActionTypes.ADD;

  constructor(readonly payload: { name: string }) {}
}

export class ActionTodosToggle {
  static readonly type = TodosActionTypes.TOGGLE;

  constructor(readonly payload: { id: string }) {}
}

export class ActionTodosRemoveDone {
  static readonly type = TodosActionTypes.REMOVE_DONE;
}

export class ActionTodosFilter {
  static readonly type = TodosActionTypes.FILTER;

  constructor(readonly payload: { filter: TodosFilter }) {}
}

export class ActionTodosPersist {
  static readonly type = TodosActionTypes.PERSIST;

  constructor(readonly payload: { todos: Todo[] }) {}
}
