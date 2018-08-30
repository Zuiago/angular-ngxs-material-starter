import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import * as StringMask from 'string-mask';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

const phoneMask8D = {
    countryCode: new StringMask('+00 (00) 0000-0000'), // with country code
    areaCode: new StringMask('(00) 0000-0000'), // with area code
    simple: new StringMask('0000-0000') // without area code
  },
  phoneMask9D = {
    countryCode: new StringMask('+00 (00) 00000-0000'), // with country code
    areaCode: new StringMask('(00) 00000-0000'), // with area code
    simple: new StringMask('00000-0000') // without area code
  },
  phoneMask0800 = {
    countryCode: null, // N/A
    areaCode: null, // N/A
    simple: new StringMask('0000-000-0000') // N/A, so it's "simple"
  };

const validMasks = [
  '+00 (00) 0000-0000',
  '(00) 0000-0000',
  '0000-0000',
  '+00 (00) 00000-0000',
  '(00) 00000-0000',
  '00000-0000',
  '0000-000-0000'
];

export function ValidatePhone(stringMask: any) {
  return (c: FormControl) => {
    if (c.value && c.value.toString() !== '') {
      const err = {
        phonePattern: true
      };

      const valueLength = c.value.toString().length;

      if (stringMask && stringMask.pattern.length > 8) {
        const maskLength = stringMask.pattern
          .trim()
          .replace(/[^0-9]/g, '')
          .slice(0, 13).length;
        return valueLength === maskLength ? null : err;
      }

      // 8- 8D without AC
      // 9- 9D without AC
      // 10- 8D with AC
      // 11- 9D with AC and 0800
      // 12- 8D with AC plus CC
      // 13- 9D with AC plus CC
      return valueLength >= 8 && valueLength <= 13 ? null : err;
    } else {
      return null;
    }
  };
}

@Directive({
  selector: '[BrPhoneMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneDirective),
      multi: true
    }
  ]
})
export class PhoneDirective implements OnInit, ControlValueAccessor {
  @Input() customMask: string;
  private phonePattern: any;

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
    if (this.customMask && this.customMask.length > 8) {
      if (this.validateMask(this.customMask)) {
        this.phonePattern = new StringMask(this.customMask);
      }
    }
    const cleanValue: string = this._cleanValue(
      this._elementRef.nativeElement.value
    );
    this._applyValueChanges(cleanValue);
  }

  /** Validate the custom mask string before use*/
  private validateMask(mask: string): boolean {
    return validMasks.some(value => value === mask);
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
    let formattedValue;

    if (this.phonePattern && cleanValue.length > 2) {
      formattedValue = this.phonePattern.apply(cleanValue);
    } else {
      if (cleanValue.indexOf('0800') === 0) {
        formattedValue = phoneMask0800.simple.apply(cleanValue);
      } else if (cleanValue.length < 9) {
        formattedValue = phoneMask8D.simple.apply(cleanValue) || '';
      } else if (cleanValue.length < 10) {
        formattedValue = phoneMask9D.simple.apply(cleanValue);
      } else if (cleanValue.length < 11) {
        formattedValue = phoneMask8D.areaCode.apply(cleanValue);
      } else if (cleanValue.length < 12) {
        formattedValue = phoneMask9D.areaCode.apply(cleanValue);
      } else if (cleanValue.length < 13) {
        formattedValue = phoneMask8D.countryCode.apply(cleanValue);
      } else {
        formattedValue = phoneMask9D.countryCode.apply(cleanValue);
      }
    }

    this._elementRef.nativeElement.value = (formattedValue || '')
      .trim()
      .replace(/[^0-9]$/, '');
    this.onChangeCallback(this._cleanValue(cleanValue));
  }

  /** It clean the captured value in the input*/
  public _cleanValue(viewValue): string {
    if (this.phonePattern) {
      const maskLength = this.phonePattern.pattern
        .trim()
        .replace(/[^0-9]/g, '')
        .slice(0, 13).length;
      return viewValue.replace(/[^0-9]/g, '').slice(0, maskLength);
    }
    return viewValue.replace(/[^0-9]/g, '').slice(0, 13);
  }

  /** Return the validation result*/
  validate(c: FormControl) {
    if (c.value) {
      this.validateFn = ValidatePhone(this.phonePattern);
    }
    return this.validateFn(c);
  }
}
