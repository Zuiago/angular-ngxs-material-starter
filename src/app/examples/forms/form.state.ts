import { Action, State, StateContext } from '@ngxs/store';
import { FormModel, FormStateModel } from '@app/examples/forms/form.model';
import { ActionFormReset, ActionFormUpdate } from '@app/examples/forms/form.actions';

export const initialState: FormStateModel = {
  form: {} as FormModel
};

@State<FormStateModel>({
  name: 'form',
  defaults: initialState
})
export class FormState {
  @Action(ActionFormReset)
  reset(ctx: StateContext<FormStateModel>) {
    ctx.setState({ ...initialState });
  }

  @Action(ActionFormUpdate)
  update(ctx: StateContext<FormStateModel>, { payload }: ActionFormUpdate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      form: payload.form
    });
  }
}
