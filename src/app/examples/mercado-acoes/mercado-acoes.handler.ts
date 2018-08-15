import {Injectable, Injector} from '@angular/core';
import {Actions, ofActionDispatched} from '@ngxs/store';

import {LocalStorageService} from '@app/core';
import {StockMarketService} from './stock-market.service';
import {MercadoAcoesService} from '@app/examples/mercado-acoes/mercado-acoes.service';
import {
  ActionStockMarketRetrieve,
  ActionStockMarketRetrieveError,
  ActionStockMarketRetrieveSuccess
} from '@app/examples/mercado-acoes/mercado-acoes.actions';
import {tap} from 'rxjs/internal/operators/tap';
import {STOCK_MARKET_KEY} from '@app/examples/mercado-acoes/mercado-acoes.state';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {debounceTime} from 'rxjs/internal/operators/debounceTime';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {map} from 'rxjs/internal/operators/map';
import {catchError} from 'rxjs/internal/operators/catchError';
import {of} from 'rxjs';

@Injectable()
export class MercadoAcoesHandler {
  constructor(private actions$: Actions,
              private localStorageService: LocalStorageService,
              private injector: Injector) {
    console.log('mercado acoes handler created');
    this.actions$.pipe(ofActionDispatched(ActionStockMarketRetrieve),
      tap(action =>
        this.localStorageService.setItem(STOCK_MARKET_KEY, {
          symbol: action.payload.symbol
        })
      ),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((action: ActionStockMarketRetrieve) =>
        this.mercadoAcoesService
          .retrieveStock(action.payload.symbol)
          .pipe(
            map(stock => new ActionStockMarketRetrieveSuccess({stock})),
            catchError(error =>
              of(new ActionStockMarketRetrieveError({error}))
            )
          )
      )
    ).subscribe();
  }

  public get mercadoAcoesService(): MercadoAcoesService {
    return this.injector.get(MercadoAcoesService);
  }
}
