import { ExtraOptions } from '@angular/router/src/router_module';

export const ROUTE_CONFIG: ExtraOptions = {
  enableTracing: false,
  useHash: true
};

export class Constants {
  static readonly DATE_FMT = 'dd/MM/yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} HH:mm:ss`;
}
