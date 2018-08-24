import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngxs/store';

@Injectable()
export class AuthGuardService implements CanActivate {
  isAuthenticated = false;

  constructor(private store: Store) {
    this.store.select(state => state.auth).subscribe(auth => {
      this.isAuthenticated = auth.isAuthenticated;
    });
  }

  canActivate(): boolean {
    return this.isAuthenticated;
  }
}
