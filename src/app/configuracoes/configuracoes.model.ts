export const NIGHT_MODE_THEME = 'BLACK-THEME';
export type Language = 'en' | 'sk' | 'de' | 'fr' | 'es' | 'pt-br' | 'he';

export interface ConfiguracoesStateModel {
  language: string;
  theme: string;
  autoNightMode: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
}
