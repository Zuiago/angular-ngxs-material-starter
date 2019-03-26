import { Action } from '@ngrx/store';
import { FormModel } from '@app/examples/forms/form.model';

export enum FormActionTypes {
  UPDATE = '[Form] Update',
  RESET = '[Form] Reset'
}

export class ActionFormUpdate {
  static readonly type = FormActionTypes.UPDATE;

  constructor(readonly payload: { form: FormModel }) {}
}

export class ActionFormReset {
  static readonly type = FormActionTypes.RESET;
}

export type FormActions = ActionFormUpdate | ActionFormReset;
