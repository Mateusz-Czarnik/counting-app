import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './containers/app/app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ValidatorsService} from "./services/validators/validators.service";


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ValidatorsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
