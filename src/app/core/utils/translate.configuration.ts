import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslateConfiguration {

    static forRoot() {
        return TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslateConfiguration.httpLoaderFactory,
                deps: [HttpClient]
            }
        });
    }

    static forExport(): any {
        return TranslateModule;
    }

    static httpLoaderFactory(http: HttpClient) {
        return new TranslateHttpLoader(http);
    }
}
