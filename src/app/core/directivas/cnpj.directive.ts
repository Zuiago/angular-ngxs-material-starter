import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  forwardRef
} from '@angular/core';

import * as BrV from 'br-validations';
import * as StringMask from 'string-mask';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

export function ValidateCnpj() {
  return (c: FormControl) => {
    const err = {
      cnpjPattern: true
    };
    return c.value && !BrV.cnpj.validate(c.value) ? err : null;
  };
}

@Directive({
  selector: '[BrCnpjMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnpjDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CnpjDirective),
      multi: true
    }
  ]
})
export class CnpjDirective implements OnInit, ControlValueAccessor {
  /** Pattern created by StringMask library*/
  private cnpjPattern = new StringMask('00.000.000/0000-00');

  /** Placeholders for the callbacks which are later providesd by the Control Value Accessor*/
  private onChangeCallback = (_: any) => {
    /*Vazio*/
  };
  private onTouchCallback = () => {
    /*Vazio*/
  };
  validateFn: any = () => {
    /*Vazio*/
  };

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    const cleanValue: string = this._cleanValue(
      this._elementRef.nativeElement.value
    );
    this._applyValueChanges(cleanValue);
  }

  /** Listener for input target of our directive*/
  @HostListener('input')
  onKeydow(): void {
    const cleanValue: string = this._cleanValue(
      this._elementRef.nativeElement.value
    );
    this._applyValueChanges(cleanValue);
  }

  /** From ControlValueAccessor interface*/
  /**
   * Write a new value to the element.
   */
  public writeValue(inputValue: string): void {
    if (!inputValue) {
      return;
    }

    const cleanValue: string = this._cleanValue(inputValue);
    this._elementRef.nativeElement.value = (
      this.cnpjPattern.apply(cleanValue) || ''
    )
      .trim()
      .replace(/[^0-9]$/, '');
  }

  /** From ControlValueAccessor interface*/
  /**
   * Set the function to be called
   * when the control receives a change event.
   */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
    return;
  }

  /** From ControlValueAccessor interface*/
  /**
   * Set the function to be called
   * when the control receives a touch event.
   */
  public registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

  /** It applies the mask in the input and updates the control's value. */
  private _applyValueChanges(cleanValue: string): void {
    this._elementRef.nativeElement.value = (
      this.cnpjPattern.apply(cleanValue) || ''
    )
      .trim()
      .replace(/[^0-9]$/, '');
    this.onChangeCallback(cleanValue);
  }

  /** It clean the captured value in the input*/
  private _cleanValue(viewValue: string): string {
    return viewValue.replace(/[^\d]/g, '').slice(0, 14);
  }

  /** Return the validation result*/
  validate(c: FormControl) {
    if (c.value) {
      this.validateFn = ValidateCnpj();
    }
    return this.validateFn(c);
  }
}
