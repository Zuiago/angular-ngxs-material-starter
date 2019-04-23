import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { AnimationsService, LocalStorageService } from '@app/core';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAnimationsPageDisabled,
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeLanguage,
  ActionConfiguracoesChangeStickyHeader,
  ActionConfiguracoesChangeTheme
} from '@app/configuracoes/configuracoes.actions';
import { ConfiguracoesStateModel, NIGHT_MODE_THEME } from '@app/configuracoes/configuracoes.model';
import { OverlayContainer } from '@angular/cdk/overlay';

export const CONFIGURACOES_KEY = 'CONFIGURACOES';

@Injectable()
export class ConfiguracoesHandler {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private animationsService: AnimationsService,
    private store: Store,
    private overlayContainer: OverlayContainer,
  ) {
    console.log('configuracoes handler created');

    this.actions$.pipe(
      ofActionSuccessful(
        ActionConfiguracoesChangeAnimationsElements,
        ActionConfiguracoesChangeAnimationsPage,
        ActionConfiguracoesChangeAnimationsPageDisabled,
        ActionConfiguracoesChangeAutoNightMode,
        ActionConfiguracoesChangeLanguage,
        ActionConfiguracoesChangeStickyHeader,
        ActionConfiguracoesChangeTheme
      ))
      .subscribe(() => {
        let configuracoes: ConfiguracoesStateModel = null;
        this.store
          .select(state => state.configuracoes)
          .subscribe(value => configuracoes = value);
        this.localStorageService.setItem(CONFIGURACOES_KEY, configuracoes);
      });

    // this.actions$.pipe(
    //   ofActionSuccessful(
    //     ActionConfiguracoesChangeAnimationsElements,
    //     ActionConfiguracoesChangeAnimationsPage
    //   ))
    //   .subscribe(() => {
    //     let configuracoes: ConfiguracoesStateModel = null;
    //     this.store
    //       .select(state => state.configuracoes)
    //       .subscribe(value => configuracoes = value);
    //     const { pageAnimations, elementsAnimations } = configuracoes;
    //
    //     this.animationsService.updateRouteAnimationType(
    //       pageAnimations,
    //       elementsAnimations
    //     );
    //   });
    //
    // this.actions$.pipe(
    //   ofActionSuccessful(
    //     ActionConfiguracoesChangeTheme,
    //   ))
    //   .subscribe(() => {
    //     let configuracoes: ConfiguracoesStateModel = null;
    //     this.store
    //       .select(state => state.configuracoes)
    //       .subscribe(value => configuracoes = value);
    //     const { theme, autoNightMode } = configuracoes;
    //     const hours = new Date().getHours();
    //     const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
    //         ? NIGHT_MODE_THEME
    //         : theme
    //     ).toLowerCase();
    //     const classList = this.overlayContainer.getContainerElement().classList;
    //     const toRemove = Array.from(classList).filter((item: string) =>
    //       item.includes('-theme')
    //     );
    //     if (toRemove.length) {
    //       classList.remove(...toRemove);
    //     }
    //     console.log(effectiveTheme);
    //     classList.add(effectiveTheme);
    //   });
  }
}
