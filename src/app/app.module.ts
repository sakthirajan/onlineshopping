import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNgModule } from './prime-ng/prime-ng.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MystockComponent } from './mystock/mystock.component';
import { UserImgComponent } from './user-img/user-img.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockComponent,
    NavMenuComponent,
    MystockComponent,
    UserImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PrimeNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
