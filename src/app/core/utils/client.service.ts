import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractRestService } from './abstract-rest.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

const urlServico = 'v0/client';

@Injectable()
export class ClientService extends AbstractRestService<string> {
  private ipAdress = new BehaviorSubject<string>('');

  constructor(_http: HttpClient) {
    super(_http, urlServico);
  }

  /**
   * Função que permite alterar a string de ip do client já em memoria na aplicação.
   */
  setIpAdress(ip: string): void {
    this.ipAdress.next(ip);
  }

  /**
   * Função que permite acessar a string de ip do client já em memoria na aplicação.
   * @returns {Observable<string>}
   */
  getIpAdress(): string {
    return this.ipAdress.getValue();
  }

  getIp(): Observable<any> {
    return this._http.get(this.route + '/ip').pipe(map((res: any) => res));
  }
}
