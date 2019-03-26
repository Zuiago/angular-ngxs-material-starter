import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import {
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeHour,
  ActionConfiguracoesChangeLanguage,
  ActionConfiguracoesChangeStickyHeader,
  ActionConfiguracoesChangeTheme
} from './configuracoes.actions';
import { LocalStorageService } from '@app/core';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAnimationsPageDisabled
} from '@app/configuracoes/configuracoes.actions';
import { ConfiguracoesStateModel, NIGHT_MODE_THEME } from '@app/configuracoes/configuracoes.model';

@State<ConfiguracoesStateModel>({
  name: 'configuracoes',
  defaults: {
    language: 'pt-br',
    theme: 'SANEAGO-THEME',
    nightTheme: NIGHT_MODE_THEME,
    stickyHeader: true,
    autoNightMode: false,
    pageAnimations: true,
    pageAnimationsDisabled: false,
    elementsAnimations: true,
    hour: 0
  }
})
export class ConfiguracoesState implements NgxsOnInit {

  ngxsOnInit(ctx: StateContext<ConfiguracoesStateModel>) {
    const initialState = LocalStorageService.loadInitialState();
    if (initialState && initialState.configuracoes) {
      ctx.setState(initialState.configuracoes);
    }
  }

  @Action(
    [ActionConfiguracoesChangeLanguage,
      ActionConfiguracoesChangeTheme,
      ActionConfiguracoesChangeAutoNightMode,
      ActionConfiguracoesChangeStickyHeader,
      ActionConfiguracoesChangeAnimationsPage,
      ActionConfiguracoesChangeAnimationsElements,
      ActionConfiguracoesChangeHour])
  setProperty(
    { patchState }: StateContext<ConfiguracoesStateModel>,
    { payload }: any
  ) {
    patchState(payload);
  }

  @Action(
    ActionConfiguracoesChangeAnimationsPageDisabled)
  setAnimationsPageDisabled(
    { patchState }: StateContext<ConfiguracoesStateModel>,
    { payload }: any
  ) {
    patchState(payload);
  }
}
