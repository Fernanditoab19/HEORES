import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,//IMPORTAMOS EL FORM
    HeroesComponent//DECLARAMOS EN EL ARRAY EL HEROE COMPONENT
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
