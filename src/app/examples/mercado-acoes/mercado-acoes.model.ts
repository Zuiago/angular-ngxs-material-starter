import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

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
