import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { SetTheme } from './configuracoes.actions';
import { LocalStorageService } from '@app/core';

export interface ConfiguracoesStateModel {
  theme: string;
  autoNightMode: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}

@State <
  ConfiguracoesStateModel >
  {
    name: 'configuracoes',
    defaults: {
      theme: 'DETRAN-THEME',
      autoNightMode: false,
      pageAnimations: true,
      pageAnimationsDisabled: false,
      elementsAnimations: true
    }
  }
export class ConfiguracoesState implements NgxsOnInit {
  ngxsOnInit(ctx: StateContext<ConfiguracoesStateModel>) {
    const initialState = LocalStorageService.loadInitialState();
    if (initialState && initialState.configuracoes) {
      ctx.setState(initialState.configuracoes);
    }
  }

  @Action(SetTheme)
  setTheme(
    { patchState }: StateContext<ConfiguracoesStateModel>,
    { payload }: SetTheme
  ) {
    patchState({ theme: payload });
  }
}
