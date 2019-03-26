import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { LocalStorageService } from '@app/core';
import { ActionFormUpdate } from '@app/examples/forms/form.actions';

export const FORM_KEY = 'EXAMPLES.FORM';

@Injectable()
export class FormHandler {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {
    console.log('form handler created');

    this.actions$
      .pipe(ofActionDispatched(ActionFormUpdate))
      .subscribe(({ payload }) => {
        const { form } = payload;
        this.localStorageService.setItem(FORM_KEY, form);
      });
  }
}
