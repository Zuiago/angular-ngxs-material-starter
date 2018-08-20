import {Injectable, Injector} from '@angular/core';
import {Actions, ofActionDispatched} from '@ngxs/store';
import {CONFIGURACOES_KEY, Persist} from './configuracoes.actions';
import {LocalStorageService} from '@app/core';
import {Router} from '@angular/router';
import {ActionAuthLogin, ActionAuthLogout} from '@app/core/auth/auth.actions';
import {AUTH_KEY} from '@app/core/auth/auth.state';

@Injectable()
export class AuthHandler {

  constructor(private actions$: Actions,
              private localStorageService: LocalStorageService,
              private injector: Injector) {
    console.log('auth handler created');

    this.actions$.pipe(ofActionDispatched(ActionAuthLogin)).subscribe(() => {
      this.localStorageService.setItem(AUTH_KEY, {isAuthenticated: true});
    });

    this.actions$.pipe(ofActionDispatched(ActionAuthLogout)).subscribe(() => {
      this.router.navigate(['']);
      this.localStorageService.setItem(AUTH_KEY, {isAuthenticated: false});
    });
  }

  public get router(): Router {
    return this.injector.get(Router);
  }
}
