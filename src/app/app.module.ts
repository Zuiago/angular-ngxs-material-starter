import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { ConfiguracoesModule } from './configuracoes';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ConfiguracoesState } from '@app/configuracoes/configuracoes.state';
import { HandlerModule } from '@app/core/handler.module';
import { AuthState } from '@app/core/auth/auth.state';
import { ConfiguracoesHandler } from '@app/configuracoes/configuracoes.handler';
import { MercadoAcoesHandler } from '@app/examples/mercado-acoes/mercado-acoes.handler';
import { TodosHandler } from '@app/examples/todos/todos.handler';
import { MercadoAcoesService } from '@app/examples/mercado-acoes/mercado-acoes.service';
import { AuthHandler } from '@app/core/auth/auth.handler';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    ConfiguracoesModule,

    // ngxs
    NgxsModule.forRoot([ConfiguracoesState, AuthState]),
    HandlerModule.forRoot([
      ConfiguracoesHandler,
      AuthHandler,
      TodosHandler,
      MercadoAcoesHandler
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [MercadoAcoesService],

  bootstrap: [AppComponent]
})
export class AppModule {}
