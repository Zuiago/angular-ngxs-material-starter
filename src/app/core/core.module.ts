///<reference path="directivas/phone.directive.ts"/>
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@env/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import {EnumToArrayPipe} from '@app/core/pipes/enum-to-array.pipe';
import {EnumToObjectPipe} from '@app/core/pipes/enum-to-object.pipe';
import {ToUpperCasePipe} from '@app/core/pipes/to.upper.case.pipe';
import {ToLowerCasePipe} from '@app/core/pipes/to.lower.case.pipe';
import {KeysPipe} from '@app/core/pipes/keys.pipe';
import {DateFormatPipe} from '@app/core/pipes/date-format.pipe';
import {DateTimeFormatPipe} from '@app/core/pipes/date-time-format.pipe';
import {TimeFormatPipe} from '@app/core/pipes/time-format.pipe';
import {LowerCaseDirective} from '@app/core/directivas/lower.case.directive';
import {UpperCaseDirective} from '@app/core/directivas/uppercase.directive';
import {CpfDirective} from '@app/core/directivas/cpf.directive';
import {PhoneDirective} from '@app/core/directivas/phone.directive';
import {UtilFunction} from '@app/core/utils/util.function';

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
  declarations: [
    EnumToArrayPipe,
    EnumToObjectPipe,
    ToUpperCasePipe,
    ToLowerCasePipe,
    KeysPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    TimeFormatPipe,
    /*Directivas*/
    LowerCaseDirective,
    UpperCaseDirective,
    PhoneDirective
  ],
  providers: [
    LocalStorageService,
    AuthGuardService,
    AnimationsService,
    TitleService,
    UtilFunction
  ],
  exports: [
    TranslateModule,
    EnumToArrayPipe,
    EnumToObjectPipe,
    ToUpperCasePipe,
    ToLowerCasePipe,
    KeysPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    TimeFormatPipe,
    /*Directivas*/
    LowerCaseDirective,
    UpperCaseDirective,
    PhoneDirective
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
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
