import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { NumberGeneratorService } from '../../service/number-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    SubscriberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NumberGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
