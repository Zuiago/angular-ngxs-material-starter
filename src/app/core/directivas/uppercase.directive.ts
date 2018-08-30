import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[toUpperCase]'
})
export class UpperCaseDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode > 32 && event.keyCode < 128) {
      event.target['value'] += event.key.toUpperCase();
      event.preventDefault();
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      event.target.dispatchEvent(evt);
    }
  }
}
