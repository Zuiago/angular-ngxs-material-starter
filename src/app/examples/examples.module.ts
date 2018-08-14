import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {SharedModule} from '@app/shared';

import {ExamplesRoutingModule} from './examples-routing.module';
import {ExamplesComponent} from './examples/examples.component';
import {TodosComponent} from './todos/todos.component';
import {ParentComponent} from './theming/parent/parent.component';
import {ChildComponent} from './theming/child/child.component';
import {AuthenticatedComponent} from './authenticated/authenticated.component';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {MercadoAcoesComponent} from '@app/examples/mercado-acoes/mercado-acoes.component';
import {NgxsModule} from '@ngxs/store';
import {MercadoAcoesState} from '@app/examples/mercado-acoes/mercado-acoes.state';
import {MercadoAcoesService} from '@app/examples/mercado-acoes/mercado-acoes.service';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    NgxsModule.forFeature([MercadoAcoesState]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    ExamplesComponent,
    TodosComponent,
    MercadoAcoesComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent
  ],
  providers: [MercadoAcoesService]
})
export class ExamplesModule {
  constructor() {
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}
