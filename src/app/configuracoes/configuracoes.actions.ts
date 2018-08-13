import {ConfiguracoesStateModel} from './configuracoes.state';

export const CONFIGURACOES_KEY = 'CONFIGURACOES';
export const NIGHT_MODE_THEME = 'BLACK-THEME';

export enum ConfiguracoesActionTypes {
    CHANGE_THEME = '[Configuracoes] Change Theme',
    CHANGE_AUTO_NIGHT_AUTO_MODE = '[Configuracoes] Change Auto Night Mode',
    CHANGE_ANIMATIONS_PAGE = '[Configuracoes] Change Animations Page',
    CHANGE_ANIMATIONS_PAGE_DISABLED = '[Configuracoes] Change Animations Page Disabled',
    CHANGE_ANIMATIONS_ELEMENTS = '[Configuracoes] Change Animations Elements',
    PERSIST = '[Configuracoes] Persist'
}

export class SetTheme {
    static readonly type = ConfiguracoesActionTypes.CHANGE_THEME;
    constructor(public payload: string) {}
}

export class SetAnimationsPageDisabled {
    static readonly type = ConfiguracoesActionTypes.CHANGE_ANIMATIONS_PAGE_DISABLED;
    constructor(public payload: boolean) {}
}

export class Persist {
    static readonly type = ConfiguracoesActionTypes.PERSIST;
    constructor(public payload: { configuracoes: ConfiguracoesStateModel}) {}
}