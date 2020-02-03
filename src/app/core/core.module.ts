import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { UsersModule } from '../feature/users/users.module';
import { fakeHttpBackendProvider } from './mock/fake-http.interceptor';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    UsersModule
  ],
  declarations: [HomeComponent, HeaderComponent],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    environment.identificationServiceUrl.startsWith('http://mock') ? fakeHttpBackendProvider : []
  ]
})
export class CoreModule { }
