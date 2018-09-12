import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { BigInputComponent } from './big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action.component';
import { EnumToArrayPipe } from '@app/core/pipes/enum-to-array.pipe';
import { EnumToObjectPipe } from '@app/core/pipes/enum-to-object.pipe';
import { ToUpperCasePipe } from '@app/core/pipes/to.upper.case.pipe';
import { ToLowerCasePipe } from '@app/core/pipes/to.lower.case.pipe';
import { KeysPipe } from '@app/core/pipes/keys.pipe';
import { DateFormatPipe } from '@app/core/pipes/date-format.pipe';
import { DateTimeFormatPipe } from '@app/core/pipes/date-time-format.pipe';
import { TimeFormatPipe } from '@app/core/pipes/time-format.pipe';
import { LowerCaseDirective } from '@app/core/directivas/lower.case.directive';
import { UpperCaseDirective } from '@app/core/directivas/uppercase.directive';
import { PhoneDirective } from '@app/core/directivas/phone.directive';
import { CpfDirective } from '@app/core/directivas/cpf.directive';
import { CepDirective } from '@app/core/directivas/cep.directive';
import { CnpjDirective } from '@app/core/directivas/cnpj.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  declarations: [
    BigInputComponent,
    BigInputActionComponent,
    EnumToArrayPipe,
    EnumToObjectPipe,
    ToUpperCasePipe,
    ToLowerCasePipe,
    KeysPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    TimeFormatPipe,
    /*Directivas*/
    LowerCaseDirective,
    UpperCaseDirective,
    PhoneDirective,
    CpfDirective,
    CepDirective,
    CnpjDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    BigInputComponent,
    BigInputActionComponent,
    EnumToArrayPipe,
    EnumToObjectPipe,
    ToUpperCasePipe,
    ToLowerCasePipe,
    KeysPipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    TimeFormatPipe,
    /*Directivas*/
    LowerCaseDirective,
    UpperCaseDirective,
    PhoneDirective,
    CpfDirective,
    CepDirective,
    CnpjDirective
  ]
})
export class SharedModule {}
