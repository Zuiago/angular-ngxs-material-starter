import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, ofActionSuccessful, Store } from '@ngxs/store';
import { AnimationsService, LocalStorageService } from '@app/core';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAutoNightMode, ActionConfiguracoesChangeHour,
  ActionConfiguracoesChangeLanguage, ActionConfiguracoesChangeStickyHeader,
  ActionConfiguracoesChangeTheme,
  ActionConfiguracoesPersist
} from '@app/configuracoes/configuracoes.actions';
import { tap, withLatestFrom } from 'rxjs/operators';

export const CONFIGURACOES_KEY = 'CONFIGURACOES';

@Injectable()
export class ConfiguracoesHandler {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private animationsService: AnimationsService,
    private store: Store
  ) {
    console.log('configuracoes handler created');

    this.actions$
      .pipe(ofActionDispatched(ActionConfiguracoesPersist))
      .subscribe(({ payload }) => {

        const observable = this.store.select(state => state.configuracoes);
        const { configuracoes } = payload;
        const { pageAnimations, elementsAnimations } = configuracoes;

        this.localStorageService.setItem(CONFIGURACOES_KEY, configuracoes);
        this.animationsService.updateRouteAnimationType(
          pageAnimations,
          elementsAnimations
        );
      });
  }
}
