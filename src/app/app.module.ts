import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ModalsComponent } from './shared/modals/modals.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './shared/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    SidebarComponent,
    FooterComponent,
    ModalsComponent,
    HeaderComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
