import {Component, OnInit} from '@angular/core';
import {UtilComponent} from '@app/core/utils/util.component';
import {FormBuilder, Validators} from '@angular/forms';

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  fullName: 'Nome completo precisa ter entre 1 e 128 caracteres',
  email: 'Email must be a valid email address (username@domain)',
  confirmEmail: 'Email addresses must match',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};

@Component({
  selector: 'anms-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent extends UtilComponent implements OnInit {

  errors = errorMessages;

  ngOnInit(): void {
    this.fb = this.getService<FormBuilder>(FormBuilder);
    this.formulario = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      sobrenome: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.email]),
      fullName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      emailTipo1: ['', [
        Validators.required,
        Validators.email,
      ]],
      emailTipo2: ['', [
        Validators.required,
        Validators.email,
      ]],
      cpf: this.fb.control(null, [Validators.required])
    });
  }

  getErrorMessage() {
    return this.formulario.controls['emailTipo2'].hasError('required') ? 'Você precisa inserir um valor' :
      this.formulario.controls['emailTipo2'] ? 'Não é um email valido' :
        '';
  }

}
