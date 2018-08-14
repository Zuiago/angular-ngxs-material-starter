import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

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
import { AuthState } from '@app/core/auth/auth.state';
import { ConfiguracoesHandler } from '@app/configuracoes/configuracoes.handler';
import { AuthHandler } from '@app/core/auth/auth.handler';

// Noop handler for factory function
export function noop() {
  return function() {};
}

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
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [ConfiguracoesHandler, AuthHandler],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
