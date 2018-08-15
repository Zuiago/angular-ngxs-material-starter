import {Action, NgxsOnInit, State, StateContext} from '@ngxs/store';
import {
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeLanguage,
  ActionConfiguracoesChangeTheme,
} from './configuracoes.actions';
import {LocalStorageService} from '@app/core';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAnimationsPageDisabled
} from '@app/configuracoes/configuracoes.actions';

export const CONFIGURACOES_KEY = 'CONFIGURACOES';
export const NIGHT_MODE_THEME = 'BLACK-THEME';

export interface ConfiguracoesStateModel {
  language: string;
  theme: string;
  autoNightMode: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}

@State<ConfiguracoesStateModel>({
  name: 'configuracoes',
  defaults: {
    language: 'en',
    theme: 'DEFAULT-THEME',
    autoNightMode: false,
    pageAnimations: true,
    pageAnimationsDisabled: false,
    elementsAnimations: true
  }
})

export class ConfiguracoesState implements NgxsOnInit {

  ngxsOnInit(ctx: StateContext<ConfiguracoesStateModel>) {
    const initialState = LocalStorageService.loadInitialState();
    if (initialState && initialState.configuracoes) {
      ctx.setState(initialState.configuracoes);
    }
  }

  @Action(ActionConfiguracoesChangeLanguage)
  setLanguage({patchState}: StateContext<ConfiguracoesStateModel>, {payload}: ActionConfiguracoesChangeLanguage) {
    patchState({language: payload});
  }

  @Action(ActionConfiguracoesChangeTheme)
  setTheme({patchState}: StateContext<ConfiguracoesStateModel>, {payload}: ActionConfiguracoesChangeTheme) {
    patchState({theme: payload});
  }

  @Action(ActionConfiguracoesChangeAutoNightMode)
  setAutoNigthMode({patchState}: StateContext<ConfiguracoesStateModel>, {payload}: ActionConfiguracoesChangeAutoNightMode) {
    patchState({autoNightMode: payload});
  }

  @Action(ActionConfiguracoesChangeAnimationsPage)
  setAnimationsPage({patchState}: StateContext<ConfiguracoesStateModel>, {payload}: ActionConfiguracoesChangeAnimationsPage) {
    patchState({pageAnimations: payload});
  }

  @Action(ActionConfiguracoesChangeAnimationsElements)
  setAnimationsElements({patchState}: StateContext<ConfiguracoesStateModel>, {payload}: ActionConfiguracoesChangeAnimationsElements) {
    patchState({pageAnimationsDisabled: payload});
  }

  @Action(ActionConfiguracoesChangeAnimationsPageDisabled)
  setAnimationsPageDisabled({patchState}: StateContext<ConfiguracoesStateModel>,
                            {payload}: ActionConfiguracoesChangeAnimationsPageDisabled) {
    patchState({
      pageAnimations: false,
      pageAnimationsDisabled: payload
    });
  }
}
