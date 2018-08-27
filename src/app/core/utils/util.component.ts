import { TranslateService } from '@ngx-translate/core';
import { Injectable, Injector, isDevMode } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidatorFn
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material';
import { NavigationExtras } from '@angular/router/src/router';
import { UtilFunction } from './util.function';

/** Error when invalid control is dirty, touched, or submitted. */
export class CoreErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Injectable()
export abstract class UtilComponent {
  public translate: TranslateService;
  public fb: FormBuilder;
  public formulario: FormGroup;
  public router: Router;
  public activatedRoute: ActivatedRoute;
  public utilFunction: UtilFunction;
  matcher = new CoreErrorStateMatcher();

  /**
   * @param {Injector} injector, recupera uma instância do injetor com base no token fornecido.
   */
  constructor(private injector: Injector) {
    this.translate = this.injector.get(TranslateService);
    this.router = this.injector.get(Router);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.utilFunction = this.injector.get(UtilFunction);
  }

  protected getService<T>(obj: any): T {
    return <T>this.injector.get(obj);
  }

  getParamSubscribe(fn_: (params) => any): void {
    this.activatedRoute.params.subscribe(params => {
      Promise.resolve(null).then(() => {
        fn_(params);
      });
    });
  }

  navigateHidden(commands: any[]): Promise<boolean> {
    return this.router.navigate(commands, {
      skipLocationChange: !isDevMode()
    });
  }

  navigate(commands: any[], extras: NavigationExtras = {}): Promise<boolean> {
    extras.skipLocationChange = !isDevMode();
    return this.router.navigate(commands, extras);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /* https://stackoverflow.com/questions/46488078/angular-4-remove-required-validator-conditionally */
  conditionalValidator(
    condition: (() => boolean),
    validator: ValidatorFn
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!condition()) {
        return null;
      }
      return validator(control);
    };
  }
}
