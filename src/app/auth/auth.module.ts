import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {LoginPageComponent} from './containers/login-page.component';
import {LoginFormComponent} from './components/login-form.component';
import {MaterialModule} from '../material';
import {SharedModule} from '@app/shared';
import {ConfiguracoesRoutingModule} from '@app/configuracoes/configuracoes-routing.module';
import {NgxsModule} from '@ngxs/store';
import {ConfiguracoesState} from '@app/configuracoes/configuracoes.state';


@NgModule({
  imports: [
    SharedModule,
    ConfiguracoesRoutingModule,
    NgxsModule.forFeature([ConfiguracoesState])
  ],
  declarations: [LoginPageComponent, LoginFormComponent],
  providers: []
})
export class AuthModule {}

