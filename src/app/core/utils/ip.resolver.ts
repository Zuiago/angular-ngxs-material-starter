import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { catchError } from 'rxjs/internal/operators';
import { of } from 'rxjs';

@Injectable()
export class IpResolver implements Resolve<any> {
  constructor(private clientService: ClientService) {}

  resolve() {
    return this.clientService.getIp().pipe(
      catchError(() => {
        return of('Ip não disponivel no momento');
      })
    );
  }
}
