import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngxs/store';
import { ActionStockMarketRetrieve } from '@app/examples/mercado-acoes/mercado-acoes.actions';

@Component({
  selector: 'anms-stock-market',
  templateUrl: './mercado-acoes.component.html',
  styleUrls: ['./mercado-acoes.component.scss']
})
export class MercadoAcoesComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  initialized;
  stocks;

  constructor(public store: Store) {}

  ngOnInit() {
    this.initialized = false;
    this.store
      .select(state => state.mercadoacoes)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((stocks: any) => {
        this.stocks = stocks;

        if (!this.initialized) {
          this.initialized = true;
          this.store.dispatch(
            new ActionStockMarketRetrieve({ symbol: stocks.symbol })
          );
        }
      });
    // this.store
    //   .select(selectorStocks)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((stocks: any) => {
    //     this.stocks = stocks;
    //
    //     if (!this.initialized) {
    //       this.initialized = true;
    //       this.store.dispatch(
    //         new ActionStockMarketRetrieve({symbol: stocks.symbol})
    //       );
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSymbolChange(symbol: string) {
    this.store.dispatch(new ActionStockMarketRetrieve({ symbol }));
  }
}
