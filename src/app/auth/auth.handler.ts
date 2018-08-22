import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { AnimationsService, LocalStorageService } from '@app/core';
import { ActionConfiguracoesPersist } from '@app/configuracoes/configuracoes.actions';
import { CONFIGURACOES_KEY } from '@app/configuracoes/configuracoes.state';

@Injectable()
export class ConfiguracoesHandler {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private animationsService: AnimationsService
  ) {
    console.log('configuracoes handler created');

    this.actions$
      .pipe(ofActionDispatched(ActionConfiguracoesPersist))
      .subscribe(({ payload }) => {
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
