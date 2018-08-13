import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CoreModule } from '../../@core';
import { TranslateLoaderConfigFactory } from '../../@core/utils/app.translate-loader-config.factoy';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesFormComponent } from './configuracoes-form/configuracoes-form.component';
import { NgxsModule } from '@ngxs/store';
import { ConfiguracoesState } from './configuracoes.state';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    SharedModule,
    ConfiguracoesRoutingModule,
    NgxsModule.forFeature([ConfiguracoesState])
  ],
  declarations: [ConfiguracoesFormComponent],
  providers: []
})
export class ConfiguracoesModule {}
