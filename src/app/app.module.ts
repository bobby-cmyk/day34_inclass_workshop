import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { DisplayComponent } from './components/display/display.component';
import { provideHttpClient } from '@angular/common/http';
import { GiphyService } from './giphy.services';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(), GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
