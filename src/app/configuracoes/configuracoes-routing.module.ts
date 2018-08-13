import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracoesFormComponent } from './configuracoes-form/configuracoes-form.component';

const routes: Routes = [
  { path: '', component: ConfiguracoesFormComponent },
  { path: 'form', component: ConfiguracoesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule {}
