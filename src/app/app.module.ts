import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPraysComponent } from './list-prays/list-prays.component';
import { PrayComponent } from './pray/pray.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BidiModule } from '@angular/cdk/bidi';
import { AthkarAfterPrayComponent } from './athkar-after-pray/athkar-after-pray.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPraysComponent,
    PrayComponent,
    AthkarAfterPrayComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BidiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
