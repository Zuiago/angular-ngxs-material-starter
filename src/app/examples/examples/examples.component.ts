import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { routeAnimations, TitleService } from '@app/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations]
})
export class ExamplesComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'anms.examples.menu.todos' },
    { link: 'forms', label: 'anms.examples.menu.forms' },
    { link: 'stock-market', label: 'anms.examples.menu.stocks' },
    { link: 'theming', label: 'anms.examples.menu.theming' },
    { link: 'authenticated', label: 'anms.examples.menu.auth', auth: true }
  ];

  constructor(
    private store: Store,
    private router: Router,
    private titleService: TitleService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.subscribeToConfiguracoes();
    this.subscribeToRouterEvents();
    this.isAuthenticated$ = this.store
      .select(state => state.auth)
      .pipe(map(auth => auth.isAuthenticated));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToConfiguracoes() {
    this.store.select(state => state.configuracoes).subscribe(configuracoes => {
      this.translate.use(configuracoes.language);
    });
  }

  private subscribeToRouterEvents() {
    this.titleService.setTitle(
      this.router.routerState.snapshot.root,
      this.translate
    );
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(snapshot =>
        this.titleService.setTitle(snapshot, this.translate)
      );
  }
}
