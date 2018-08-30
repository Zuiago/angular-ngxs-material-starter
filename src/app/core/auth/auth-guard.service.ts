import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(state => state.auth)
      .pipe(map(auth => auth.isAuthenticated));
  }
}
