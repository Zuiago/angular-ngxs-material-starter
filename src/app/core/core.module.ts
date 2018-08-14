import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {storeFreeze} from 'ngrx-store-freeze';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {environment} from '@env/environment';

import {initStateFromLocalStorage} from './meta-reducers/init-state-from-local-storage.reducer';
import {LocalStorageService} from './local-storage/local-storage.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {AnimationsService} from './animations/animations.service';
import {TitleService} from './title/title.service';


@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  providers: [
    LocalStorageService,
    AuthGuardService,
    AnimationsService,
    TitleService
  ],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(@Optional()
              @SkipSelf()
                parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
