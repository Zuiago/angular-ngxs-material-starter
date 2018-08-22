import { ConfiguracoesStateModel } from './configuracoes.state';

export enum ConfiguracoesActionTypes {
  CHANGE_LANGUAGE = '[Configuracoes] Change Language',
  CHANGE_THEME = '[Configuracoes] Change Theme',
  CHANGE_AUTO_NIGHT_AUTO_MODE = '[Configuracoes] Change Auto Night Mode',
  CHANGE_ANIMATIONS_PAGE = '[Configuracoes] Change Animations Page',
  CHANGE_ANIMATIONS_PAGE_DISABLED = '[Configuracoes] Change Animations Page Disabled',
  CHANGE_ANIMATIONS_ELEMENTS = '[Configuracoes] Change Animations Elements',
  PERSIST = '[Configuracoes] Persist'
}

export type Language = 'en' | 'sk';

export class ActionConfiguracoesChangeLanguage {
  static readonly type = ConfiguracoesActionTypes.CHANGE_LANGUAGE;

  constructor(readonly payload: Language) {}
}

export class ActionConfiguracoesChangeTheme {
  static readonly type = ConfiguracoesActionTypes.CHANGE_THEME;

  constructor(readonly payload: string) {}
}

export class ActionConfiguracoesChangeAutoNightMode {
  static readonly type = ConfiguracoesActionTypes.CHANGE_AUTO_NIGHT_AUTO_MODE;

  constructor(readonly payload: boolean) {}
}

export class ActionConfiguracoesChangeAnimationsPage {
  static readonly type = ConfiguracoesActionTypes.CHANGE_ANIMATIONS_PAGE;

  constructor(readonly payload: boolean) {}
}

export class ActionConfiguracoesChangeAnimationsPageDisabled {
  static readonly type = ConfiguracoesActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED;

  constructor(readonly payload: boolean) {}
}

export class ActionConfiguracoesChangeAnimationsElements {
  static readonly type = ConfiguracoesActionTypes.CHANGE_ANIMATIONS_ELEMENTS;

  constructor(readonly payload: boolean) {}
}

export class ActionConfiguracoesPersist {
  static readonly type = ConfiguracoesActionTypes.PERSIST;

  constructor(readonly payload: { configuracoes: ConfiguracoesStateModel }) {}
}
