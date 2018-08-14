import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Stock} from '@app/examples/mercado-acoes/mercado-acoes.state';
import {map} from 'rxjs/internal/operators/map';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

@Injectable()
export class MercadoAcoesService {
  constructor(private httpClient: HttpClient) {}

  retrieveStock(symbol: string): Observable<Stock> {
    return this.httpClient
      .get(PROXY_URL + `https://api.iextrading.com/1.0/stock/${symbol}/quote`)
      .pipe(
        map((stock: any) => ({
          symbol: stock.symbol,
          exchange: stock.primaryExchange,
          last: stock.latestPrice,
          ccy: 'USD',
          change: stock.close,
          changePositive: stock.change.toString().indexOf('+') === 0,
          changeNegative: stock.change.toString().indexOf('-') === 0,
          changePercent: stock.changePercent.toFixed(2)
        }))
      );
  }
}
