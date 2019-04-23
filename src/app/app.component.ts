import browser from 'browser-detect';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnimationsService, routeAnimations, TitleService } from '@app/core';
import { environment as env } from '@env/environment';

import {
  ActionConfiguracoesChangeAnimationsPageDisabled,
  ActionConfiguracoesChangeLanguage,
  ActionConfiguracoesPersist
} from '@app/configuracoes/configuracoes.actions';
import { Select, Store } from '@ngxs/store';
import { ActionAuthLogin, ActionAuthLogout } from '@app/core/auth/auth.actions';
import {
  ConfiguracoesStateModel,
  NIGHT_MODE_THEME
} from '@app/configuracoes/configuracoes.model';
import { AuthState } from '@app/core/auth/auth.state';
import { AuthStateModel } from '@app/core/auth/auth.model';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @Select(AuthState) auth$: Observable<AuthStateModel>;

  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['en', 'de', 'sk', 'pt-br', 'fr', 'es', 'zh-cn', 'he'];
  navigation = [
    { link: 'about', label: 'anms.menu.about' },
    { link: 'features', label: 'anms.menu.features' },
    { link: 'examples', label: 'anms.menu.examples' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'anms.menu.settings' }
  ];

  settings: ConfiguracoesStateModel;
  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store,
    private router: Router,
    private titleService: TitleService,
    private animationService: AnimationsService,
    private translate: TranslateService
  ) {
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  private static trackPageView(event: NavigationEnd) {
    (<any>window).ga('set', 'page', event.urlAfterRedirects);
    (<any>window).ga('send', 'pageview');
  }

  ngOnInit(): void {
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionConfiguracoesChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);
    this.stickyHeader$ = this.store.select(state => state.configuracoes.stickyHeader);
    this.language$ = this.store.select(state => state.configuracoes.language);
    this.theme$ = this.store.select(state => state.configuracoes.theme);

    this.translate.setDefaultLang('en');
    this.subscribeToConfiguracoes();
    // this.subscribeToIsAuthenticated();
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLoginClick() {
    this.store.dispatch(new ActionAuthLogin());
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionConfiguracoesChangeLanguage(language));
  }

  private subscribeToConfiguracoes() {
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch([
        new ActionConfiguracoesChangeAnimationsPageDisabled({ pageAnimationsDisabled: true })
      ]);
    }
    this.store
      .select(state => state.configuracoes)
      .subscribe(configuracoes => {
        this.settings = configuracoes;
        this.setTheme(configuracoes);
        this.setLanguage(configuracoes);
        this.animationService.updateRouteAnimationType(
          configuracoes.pageAnimations,
          configuracoes.elementsAnimations
        );
      });
  }

  private setTheme(settings: ConfiguracoesStateModel) {
    const { theme, autoNightMode } = settings;
    const hours = new Date().getHours();
    const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
        ? NIGHT_MODE_THEME
        : theme
    ).toLowerCase();
    this.componentCssClass = effectiveTheme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    console.log(effectiveTheme);
    classList.add(effectiveTheme.toLocaleLowerCase());
  }

  private setLanguage(settings: ConfiguracoesStateModel) {
    const { language } = settings;
    if (language) {
      this.translate.use(language);
    }
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.titleService.setTitle(event.snapshot);
      }

      if (event instanceof NavigationEnd) {
        AppComponent.trackPageView(event);
      }
    });
  }
}
