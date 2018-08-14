import {NgModule, ModuleWithProviders, APP_INITIALIZER} from '@angular/core';
import {NgxsModule} from '@ngxs/store';

// a fake factory which gets all the handlers
const noopFactory = () => {
  return (): Promise<void> => {
    return Promise.resolve();
  };
};

@NgModule({
  imports: [
    NgxsModule,
  ]
})
export class HandlerModule {
  static forRoot(handlers: any[] = []): ModuleWithProviders {
    return {
      ngModule: HandlerModule,
      providers: [
        ...handlers,
        // force all supplied handlers to be instantiated by setting them as deps to the noopAppInitializer
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: noopFactory,
          deps: handlers
        }
      ]
    };
  }
}
