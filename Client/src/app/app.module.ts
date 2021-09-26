import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './_modules/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ThemeModule } from './_theme/theme.module';
import { lightTheme } from './_theme/light-theme';
import { darkTheme } from './_theme/dark-theme';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxSpinnerModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
