import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPraysComponent } from './list-prays/list-prays.component';
import { PrayComponent } from './pray/pray.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BidiModule } from '@angular/cdk/bidi';
@NgModule({
  declarations: [
    AppComponent,
    ListPraysComponent,
    PrayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    BidiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
