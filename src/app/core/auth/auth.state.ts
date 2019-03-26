import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ActionAuthLogin, ActionAuthLogout } from '@app/core/auth/auth.actions';
import { AuthStateModel } from '@app/core/auth/auth.model';

export const initialState: AuthStateModel = {
  isAuthenticated: false
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: initialState
})
export class AuthState {
  @Action(ActionAuthLogin)
  login({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      isAuthenticated: true
    });
  }

  @Action(ActionAuthLogout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      isAuthenticated: false
    });
  }
}
