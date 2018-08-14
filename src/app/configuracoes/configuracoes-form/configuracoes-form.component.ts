import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ConfiguracoesStateModel} from '../configuracoes.state';
import {
  ActionConfiguracoesChangeAnimationsElements,
  ActionConfiguracoesChangeAnimationsPage,
  ActionConfiguracoesChangeAutoNightMode,
  ActionConfiguracoesChangeLanguage,
  ActionConfiguracoesChangeTheme,
  ActionConfiguracoesPersist
} from '@app/configuracoes/configuracoes.actions';

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
    {value: 'DEFAULT-THEME', label: 'Blue'},
    {value: 'LIGHT-THEME', label: 'Light'},
    {value: 'NATURE-THEME', label: 'Nature'},
    {value: 'BLACK-THEME', label: 'Dark'}
  ];

  languages = [{value: 'en', label: 'en'}, {value: 'sk', label: 'sk'}];

  constructor(private store: Store) {
    this.store.select(state => state.configuracoes).subscribe(configuracoes => {
      this.configuracoes = configuracoes;
    });
  }

  ngOnInit(): void {
  }

  onLanguageSelect({value: language}) {
    this.store.dispatch(new ActionConfiguracoesChangeLanguage(language));
    this.store.dispatch(new ActionConfiguracoesPersist({configuracoes: this.configuracoes}));
  }

  onThemeSelect({value: theme}) {
    this.store.dispatch([new ActionConfiguracoesChangeTheme(theme)]);
    this.store.dispatch([new ActionConfiguracoesPersist({configuracoes: this.configuracoes})]);
  }

  onAutoNightModeToggle({checked: autoNightMode}) {
    this.store.dispatch(
      new ActionConfiguracoesChangeAutoNightMode(autoNightMode)
    );
    this.store.dispatch(new ActionConfiguracoesPersist({configuracoes: this.configuracoes}));
  }

  onPageAnimationsToggle({checked: pageAnimations}) {
    this.store.dispatch(
      new ActionConfiguracoesChangeAnimationsPage(pageAnimations)
    );
    this.store.dispatch(new ActionConfiguracoesPersist({configuracoes: this.configuracoes}));
  }

  onElementsAnimationsToggle({checked: elementsAnimations}) {
    this.store.dispatch(
      new ActionConfiguracoesChangeAnimationsElements(elementsAnimations)
    );
    this.store.dispatch(new ActionConfiguracoesPersist({configuracoes: this.configuracoes}));
  }

}
