export const NIGHT_MODE_THEME = 'BLACK-THEME';
export type Language = 'en' | 'sk' | 'de' | 'pt-br' | 'fr' | 'es';

export interface ConfiguracoesStateModel {
  language: string;
  theme: string;
  autoNightMode: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}
