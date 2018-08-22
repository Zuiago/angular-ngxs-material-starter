import { ConfiguracoesStateModel } from './configuracoes.state';
import { Stock } from '@app/examples/mercado-acoes/mercado-acoes.state';
import { HttpErrorResponse } from '@angular/common/http';

export enum StockMarketActionTypes {
  RETRIEVE = '[Stock] Retrieve',
  RETRIEVE_SUCCESS = '[Stock] Retrieve Success',
  RETRIEVE_ERROR = '[Stock] Retrieve Error'
}

export class ActionStockMarketRetrieve {
  static readonly type = StockMarketActionTypes.RETRIEVE;

  constructor(readonly payload: { symbol: string }) {}
}

export class ActionStockMarketRetrieveSuccess {
  static readonly type = StockMarketActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { stock: Stock }) {}
}

export class ActionStockMarketRetrieveError {
  static readonly type = StockMarketActionTypes.RETRIEVE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) {}
}
