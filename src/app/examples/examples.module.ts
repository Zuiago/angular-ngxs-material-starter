import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosComponent } from './todos/todos.component';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { MercadoAcoesComponent } from '@app/examples/mercado-acoes/mercado-acoes.component';
import { NgxsModule } from '@ngxs/store';
import { MercadoAcoesState } from '@app/examples/mercado-acoes/mercado-acoes.state';
import { TodosState } from '@app/examples/todos/todos.state';
import { NotificationsComponent } from '@app/examples/notifications/components/notifications.component';
import { FormComponent } from '@app/examples/forms/form.component';

@NgModule({
  imports: [
    SharedModule,
    ExamplesRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    NgxsModule.forFeature([TodosState, MercadoAcoesState])
  ],
  declarations: [
    ExamplesComponent,
    FormComponent,
    TodosComponent,
    MercadoAcoesComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent,
    NotificationsComponent
  ],
  providers: []
})
export class ExamplesModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}
