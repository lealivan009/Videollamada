import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { VideollamadaComponent } from './components/videollamada/videollamada.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ThanksComponent,
    VideollamadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //CUANDO HAGO CONSULTAS A API NECESITO IMPORTAR ESTE MODULO

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
