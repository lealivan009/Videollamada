import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThanksComponent } from './components/thanks/thanks.component';
import { VideollamadaComponent } from './components/videollamada/videollamada.component';

const routes: Routes = [
  {path:'reunion/:id', component: VideollamadaComponent},
  {path:'thanks', component: ThanksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
