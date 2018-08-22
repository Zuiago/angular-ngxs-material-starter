import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '@app/core';

import { MercadoAcoesService } from '@app/examples/mercado-acoes/mercado-acoes.service';

describe('MercadoAcoesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule],
      providers: [MercadoAcoesService]
    });
  });

  it(
    'should be created',
    inject([MercadoAcoesService], (service: MercadoAcoesService) => {
      expect(service).toBeTruthy();
    })
  );
});
