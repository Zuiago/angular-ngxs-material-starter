import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracoesContainerComponent } from './components/configuracoes-container.component';

const routes: Routes = [
  { path: '', component: ConfiguracoesContainerComponent },
  { path: 'form', component: ConfiguracoesContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule {}
