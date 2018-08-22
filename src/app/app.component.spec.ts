import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { ConfiguracoesState } from '@app/configuracoes/configuracoes.state';
import { AuthState } from '@app/core/auth/auth.state';

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          NgxsModule.forRoot([ConfiguracoesState, AuthState]),
          RouterTestingModule,
          SharedModule,
          CoreModule
        ],
        declarations: [AppComponent]
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
