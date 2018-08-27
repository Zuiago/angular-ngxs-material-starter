import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeLanguage,
  ActionConfiguracoesChangeTheme,
  ActionConfiguracoesPersist
} from '@app/configuracoes/configuracoes.actions';
import { ConfiguracoesStateModel } from '@app/configuracoes/configuracoes.model';

@Component({
  selector: 'gsa-configuracoes-form',
  templateUrl: './configuracoes-form.component.html',
  styles: []
})
export class ConfiguracoesFormComponent implements OnInit {
  // // Variável que abriga o valor Observable do objeto
  // @Select(ConfiguracoesState) configuracoes$: Observable<ConfiguracoesStateModel>;

  // Variável que abriga o valor puro do objeto
  configuracoes: ConfiguracoesStateModel;

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
    { value: 'pt-br', label: 'pt-br' },
    { value: 'fr', label: 'fr' },
    { value: 'es', label: 'es' }
  ];

  constructor(private store: Store) {
    this.store.select(state => state.configuracoes).subscribe(configuracoes => {
      this.configuracoes = configuracoes;
    });
  }

  ngOnInit(): void {}

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionConfiguracoesChangeLanguage(language));
    this.store.dispatch(
      new ActionConfiguracoesPersist({ configuracoes: this.configuracoes })
    );
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch([new ActionConfiguracoesChangeTheme(theme)]);
    this.store.dispatch([
      new ActionConfiguracoesPersist({ configuracoes: this.configuracoes })
    ]);
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.store.dispatch(
      new ActionConfiguracoesChangeAutoNightMode(autoNightMode)
    );
    this.store.dispatch(
      new ActionConfiguracoesPersist({ configuracoes: this.configuracoes })
    );
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.store.dispatch(
      new ActionConfiguracoesChangeAnimationsPage(pageAnimations)
    );
    this.store.dispatch(
      new ActionConfiguracoesPersist({ configuracoes: this.configuracoes })
    );
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.store.dispatch(
      new ActionConfiguracoesChangeAnimationsElements(elementsAnimations)
    );
    this.store.dispatch(
      new ActionConfiguracoesPersist({ configuracoes: this.configuracoes })
    );
  }
}
