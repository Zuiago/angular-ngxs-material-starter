import {
  ConfiguracoesStateModel,
  Language
} from '@app/configuracoes/configuracoes.model';

export enum ConfiguracoesActionTypes {
  CHANGE_LANGUAGE = '[Configuracoes] Change Language',
  CHANGE_THEME = '[Configuracoes] Change Theme',
  CHANGE_AUTO_NIGHT_AUTO_MODE = '[Configuracoes] Change Auto Night Mode',
  CHANGE_STICKY_HEADER = '[Configuracoes] Change Sticky Header',
  CHANGE_ANIMATIONS_PAGE = '[Configuracoes] Change Animations Page',
  CHANGE_ANIMATIONS_PAGE_DISABLED = '[Configuracoes] Change Animations Page Disabled',
  CHANGE_ANIMATIONS_ELEMENTS = '[Configuracoes] Change Animations Elements',
  PERSIST = '[Configuracoes] Persist',
  CHANGE_HOUR = '[Configuracoes] Change Hours'
}

export class ActionConfiguracoesChangeLanguage {
  static readonly type = ConfiguracoesActionTypes.CHANGE_LANGUAGE;

  constructor(readonly payload: { language: Language }) {}
}

export class ActionConfiguracoesChangeTheme {
  static readonly type = ConfiguracoesActionTypes.CHANGE_THEME;

  constructor(readonly payload:  { theme: string }) {}
}

export class ActionConfiguracoesChangeAutoNightMode {
  static readonly type = ConfiguracoesActionTypes.CHANGE_AUTO_NIGHT_AUTO_MODE;

  constructor(readonly payload: { autoNightMode: boolean }) {}
}

export class ActionConfiguracoesChangeStickyHeader {
  static readonly type = ConfiguracoesActionTypes.CHANGE_STICKY_HEADER;

  constructor(readonly payload: { stickyHeader: boolean }) {}
}

export class ActionConfiguracoesChangeAnimationsPage {
  static readonly type = ConfiguracoesActionTypes.CHANGE_ANIMATIONS_PAGE;

  constructor(readonly payload:  { pageAnimations: boolean }) {}
}

export class ActionConfiguracoesChangeAnimationsPageDisabled {
  static readonly type = ConfiguracoesActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED;

  constructor(readonly payload: { pageAnimationsDisabled: boolean }) {}
}

export class ActionConfiguracoesChangeAnimationsElements {
  static readonly type = ConfiguracoesActionTypes.CHANGE_ANIMATIONS_ELEMENTS;

  constructor(readonly payload: { elementsAnimations: boolean }) {}
}

export class ActionConfiguracoesPersist {
  static readonly type = ConfiguracoesActionTypes.PERSIST;

  constructor(readonly payload: { configuracoes: ConfiguracoesStateModel }) {}
}

export class ActionConfiguracoesChangeHour {
  static readonly type = ConfiguracoesActionTypes.CHANGE_HOUR;

  constructor(readonly payload: { hour: number }) {}
}
