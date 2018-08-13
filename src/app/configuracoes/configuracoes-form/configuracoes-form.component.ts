import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ConfiguracoesStateModel} from '../configuracoes.state';
import {Persist, SetTheme} from '../configuracoes.actions';

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

  constructor(private store: Store) {
    this.store.select(state => state.configuracoes).subscribe(configuracoes => {
      this.configuracoes = configuracoes;
    });
  }

  ngOnInit(): void {
  }

  onThemeSelect({value: theme}) {
    this.store.dispatch([new SetTheme(theme)]);
    this.store.dispatch([new Persist({configuracoes: this.configuracoes})]);
  }

}
