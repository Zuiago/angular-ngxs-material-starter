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
