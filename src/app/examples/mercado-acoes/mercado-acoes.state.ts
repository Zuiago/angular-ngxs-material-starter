import {HttpErrorResponse} from '@angular/common/http';
import {
  ActionStockMarketRetrieve,
  ActionStockMarketRetrieveError,
  ActionStockMarketRetrieveSuccess
} from '@app/examples/mercado-acoes/mercado-acoes.actions';
import {Action, State, StateContext} from '@ngxs/store';

export const STOCK_MARKET_KEY = 'EXAMPLES.STOCKS';

export const initialState: MercadoAcoesStateModel = {
  symbol: 'GOOGL',
  loading: false
};

export const selectorStocks = state => state.examples.stocks;

@State<MercadoAcoesStateModel>({
  name: 'mercadoacoes',
  defaults: initialState
})

export class MercadoAcoesState {

  @Action(ActionStockMarketRetrieve)
  retrieve({patchState}: StateContext<MercadoAcoesStateModel>, {payload}: ActionStockMarketRetrieve) {
    patchState({
      loading: true,
      stock: null,
      error: null,
      symbol: payload.symbol
    });
  }

  @Action(ActionStockMarketRetrieveSuccess)
  retrieveSuccess({patchState}: StateContext<MercadoAcoesStateModel>, {payload}: ActionStockMarketRetrieveSuccess) {
    patchState({
      loading: false,
      stock: payload.stock,
      error: null,
    });
  }

  @Action(ActionStockMarketRetrieveError)
  retrieveError({patchState}: StateContext<MercadoAcoesStateModel>,
                {payload}: ActionStockMarketRetrieveError) {
    patchState({
      loading: false,
      stock: null,
      error: payload.error
    });
  }
}

export interface Stock {
  symbol: string;
  exchange: string;
  last: string;
  ccy: string;
  change: string;
  changePositive: boolean;
  changeNegative: boolean;
  changePercent: string;
}

export interface MercadoAcoesStateModel {
  symbol: string;
  loading: boolean;
  stock?: Stock;
  error?: HttpErrorResponse;
}
