import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeLanguage, ActionConfiguracoesChangeStickyHeader,
  ActionConfiguracoesChangeTheme,
  ActionConfiguracoesPersist
} from '@app/configuracoes/configuracoes.actions';
import { ConfiguracoesStateModel, NIGHT_MODE_THEME } from '@app/configuracoes/configuracoes.model';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-configuracoes',
  templateUrl: './configuracoes-container.component.html',
  styleUrls: ['./configuracoes-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfiguracoesContainerComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  configuracoes$: Observable<ConfiguracoesStateModel>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' },
    { value: 'SANEAGO-THEME', label: 'saneago' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'de', label: 'de' },
    { value: 'sk', label: 'sk' },
    { value: 'fr', label: 'fr' },
    { value: 'es', label: 'es' },
    { value: 'pt-br', label: 'pt-br' },
    { value: 'zh-cn', label: 'zh-cn' },
    { value: 'he', label: 'he' }
  ];

  constructor(private store: Store) {
    this.configuracoes$ = this.store.select(state => state.configuracoes);
  }

  ngOnInit(): void {}

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionConfiguracoesChangeLanguage({ language }));
    this.store.dispatch(
      new ActionConfiguracoesPersist({ configuracoes: {
          language: 'pt-br',
          theme: 'SANEAGO-THEME',
          nightTheme: NIGHT_MODE_THEME,
          stickyHeader: true,
          autoNightMode: false,
          pageAnimations: true,
          pageAnimationsDisabled: false,
          elementsAnimations: true,
          hour: 0
        }})
    );
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch([new ActionConfiguracoesChangeTheme({ theme })]);
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.store.dispatch(new ActionConfiguracoesChangeAutoNightMode({ autoNightMode }));
  }

  onStickyHeaderToggle({ checked: stickyHeader }) {
    this.store.dispatch(new ActionConfiguracoesChangeStickyHeader({ stickyHeader }));
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(new ActionConfiguracoesChangeAnimationsPage({ pageAnimations }));
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(new ActionConfiguracoesChangeAnimationsElements({ elementsAnimations }));
  }
}
