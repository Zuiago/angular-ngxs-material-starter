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

export function ValidateCpf() {
  return (c: FormControl) => {
    const err = {
      cpfPattern: true
    };
    return c.value && !BrV.cpf.validate(c.value) ? err : null;
  };
}

@Directive({
  selector: '[BrCpfMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CpfDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CpfDirective),
      multi: true
    }
  ]
})
export class CpfDirective implements OnInit, ControlValueAccessor {
  /** Pattern created by StringMask library*/
  private cpfPattern = new StringMask('000.000.000-00');

  /** Placeholders for the callbacks which are later provides by the Control Value Accessor*/
  public onChangeCallback = (_: any) => {
    /*Vazio*/
  };
  @HostListener('blur', ['$event'])
  public onTouchCallback = () => {
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
  public writeValue(modelValue: string): void {
    if (modelValue === null || modelValue === undefined) {
      this._elementRef.nativeElement.value = '';
      return;
    }

    const cleanValue: string = this._cleanValue(modelValue);
    this._applyValueChanges(cleanValue);
  }

  /** From ControlValueAccessor interface*/
  /**
   * Set the function to be called
   * when the control receives a change event.
   */
  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
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
  public _applyValueChanges(cleanValue): void {
    this._elementRef.nativeElement.value = (
      this.cpfPattern.apply(cleanValue) || ''
    )
      .trim()
      .replace(/[^0-9]$/, '');
    this.onChangeCallback(cleanValue);
  }

  /** It clean the captured value in the input*/
  public _cleanValue(viewValue): string {
    return viewValue.replace(/[^\d]/g, '').slice(0, 11);
  }

  /** Return the validation result*/
  validate(c: FormControl) {
    if (c.value) {
      this.validateFn = ValidateCpf();
    }
    return this.validateFn(c);
  }
}
